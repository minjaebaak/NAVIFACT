"""Seed the Neo4j database with scenario data from frontend JSON files.

Reads the seed JSON files used by the frontend and inserts them into Neo4j
with deterministic UUID mapping so that frontend short IDs (e.g. 'evt-001')
can be round-tripped to/from UUIDs.

Auto-detects all scenarios from the seed directory.
"""

import asyncio
import json
import uuid
from pathlib import Path

from app.config import settings
from app.db.neo4j import close_driver, execute_query, init_driver

# Fixed namespace for deterministic UUID generation
NAMESPACE = uuid.UUID("a1b2c3d4-e5f6-7890-abcd-ef1234567890")

# Path to frontend seed data
SEED_DIR = Path(__file__).resolve().parent.parent.parent / "web" / "data" / "seed"

# Category mapping: Korean → English enum
CATEGORY_MAP = {
    "외교": "political",
    "경제": "economic",
    "군사": "military",
    "법률": "legal",
}

# Auto-detect all scenarios from seed directory
SCENARIOS: list[dict] = []
for _events_file in sorted(SEED_DIR.glob("*-events.json")):
    _prefix = _events_file.stem.removesuffix("-events")
    if _prefix == "shop":  # Skip non-scenario files
        continue
    SCENARIOS.append(
        {
            "prefix": _prefix,
            "files": {
                "events": f"{_prefix}-events.json",
                "links": f"{_prefix}-links.json",
                "agreement": f"{_prefix}-agreement.json",
                "predictions": f"{_prefix}-predictions.json",
                "narratives": f"{_prefix}-narratives.json",
                "claims": f"{_prefix}-claims.json",
                "market_impacts": f"{_prefix}-market-impacts.json",
            },
        }
    )


def short_to_uuid(short_id: str) -> str:
    """Deterministic UUID from a short ID like 'evt-001'."""
    return str(uuid.uuid5(NAMESPACE, short_id))


def load_json(filename: str) -> dict | list:
    """Load a JSON file from the seed directory."""
    path = SEED_DIR / filename
    with open(path, encoding="utf-8") as f:
        return json.load(f)


async def clear_database() -> None:
    """Remove all nodes and relationships."""
    await execute_query("MATCH (n) DETACH DELETE n")
    print("  Cleared existing data.")


async def seed_events(events: list[dict]) -> None:
    """Create Event nodes."""
    for e in events:
        uid = short_to_uuid(e["id"])
        await execute_query(
            """
            CREATE (ev:Event {
                id: $id,
                short_id: $short_id,
                title: $title,
                description: $description,
                date: date($date),
                location: '',
                category: $category,
                source_urls: [],
                tags: [],
                credibility_score: $credibility,
                status: $status,
                created_at: datetime(),
                updated_at: datetime()
            })
            """,
            {
                "id": uid,
                "short_id": e["id"],
                "title": e["title"],
                "description": e["description"],
                "date": e["date"],
                "category": CATEGORY_MAP.get(e["category"], e["category"]),
                "credibility": e["confidence"] / 100.0,
                "status": e["status"],
            },
        )
    print(f"  Created {len(events)} events.")


async def seed_links(links: list[dict]) -> None:
    """Create CAUSED relationships between events."""
    causal_type_map = {
        "direct": "direct",
        "indirect": "indirect",
        "contributing": "contributing",
        "enabling": "enabling",
    }
    for link in links:
        source_uid = short_to_uuid(link["source"])
        target_uid = short_to_uuid(link["target"])
        await execute_query(
            """
            MATCH (s:Event {id: $source_id}), (t:Event {id: $target_id})
            CREATE (s)-[:CAUSED {
                id: $link_id,
                confidence: $confidence,
                description: $mechanism,
                causal_type: $causal_type
            }]->(t)
            """,
            {
                "source_id": source_uid,
                "target_id": target_uid,
                "link_id": short_to_uuid(link["id"]),
                "confidence": link["confidence"] / 100.0,
                "mechanism": link["mechanism"],
                "causal_type": causal_type_map.get(
                    link["causalType"], link["causalType"]
                ),
            },
        )
    print(f"  Created {len(links)} causal links.")


async def seed_agreement(agreement: dict) -> None:
    """Create Agreement node, Party (Actor) nodes, and Obligation nodes."""
    agr_uid = short_to_uuid(agreement["id"])

    # Agreement node
    await execute_query(
        """
        CREATE (a:Agreement {
            id: $id,
            short_id: $short_id,
            title: $title,
            description: $summary,
            agreement_type: 'trade',
            signed_date: date($date),
            status: $status,
            parties: $party_names,
            source_urls: [],
            created_at: datetime(),
            updated_at: datetime()
        })
        """,
        {
            "id": agr_uid,
            "short_id": agreement["id"],
            "title": agreement["title"],
            "summary": agreement.get("summary", ""),
            "date": agreement["date"],
            "status": agreement.get("status", "active"),
            "party_names": [p["name"] for p in agreement["parties"]],
        },
    )

    # Actor nodes for parties
    for party in agreement["parties"]:
        party_uid = short_to_uuid(party["id"])
        await execute_query(
            """
            MERGE (actor:Actor {id: $id})
            ON CREATE SET
                actor.short_id = $short_id,
                actor.name = $name,
                actor.flag = $flag,
                actor.created_at = datetime(),
                actor.updated_at = datetime()
            """,
            {
                "id": party_uid,
                "short_id": party["id"],
                "name": party["name"],
                "flag": party.get("flag", ""),
            },
        )
        # Link agreement to party
        await execute_query(
            """
            MATCH (a:Agreement {id: $agr_id}), (actor:Actor {id: $actor_id})
            CREATE (a)-[:BETWEEN]->(actor)
            """,
            {"agr_id": agr_uid, "actor_id": party_uid},
        )

    # Obligation nodes
    for obl in agreement["obligations"]:
        obl_uid = short_to_uuid(obl["id"])
        assigned_uid = short_to_uuid(obl["assignedTo"]["id"])
        consequence_uid = (
            short_to_uuid(obl["consequenceEventId"])
            if obl.get("consequenceEventId")
            else None
        )

        await execute_query(
            """
            CREATE (o:Obligation {
                id: $id,
                short_id: $short_id,
                description: $description,
                deadline: $deadline,
                status: $status,
                created_at: datetime(),
                updated_at: datetime()
            })
            """,
            {
                "id": obl_uid,
                "short_id": obl["id"],
                "description": obl["description"],
                "deadline": obl["deadline"],
                "status": obl["status"],
            },
        )

        # Agreement -[HAS_OBLIGATION]-> Obligation
        await execute_query(
            """
            MATCH (a:Agreement {id: $agr_id}), (o:Obligation {id: $obl_id})
            CREATE (a)-[:HAS_OBLIGATION]->(o)
            """,
            {"agr_id": agr_uid, "obl_id": obl_uid},
        )

        # Obligation -[ASSIGNED_TO]-> Actor
        await execute_query(
            """
            MATCH (o:Obligation {id: $obl_id}), (actor:Actor {id: $actor_id})
            CREATE (o)-[:ASSIGNED_TO]->(actor)
            """,
            {"obl_id": obl_uid, "actor_id": assigned_uid},
        )

        # If violated, link to consequence event
        if consequence_uid:
            await execute_query(
                """
                MATCH (o:Obligation {id: $obl_id}), (e:Event {id: $evt_id})
                CREATE (o)-[:TRIGGERED]->(e)
                """,
                {"obl_id": obl_uid, "evt_id": consequence_uid},
            )

    print(
        f"  Created agreement '{agreement['title']}' with "
        f"{len(agreement['parties'])} parties, {len(agreement['obligations'])} obligations."
    )


async def seed_predictions(predictions: list[dict]) -> None:
    """Create PredictionMarket nodes."""
    for pred in predictions:
        uid = short_to_uuid(pred["id"])
        total_pool = pred["yesPool"] + pred["noPool"]
        yes_prob = pred["yesPool"] / total_pool if total_pool > 0 else 0.5
        await execute_query(
            """
            CREATE (m:PredictionMarket {
                id: $id,
                short_id: $short_id,
                question: $question,
                description: $settlement_criteria,
                status: $status,
                yes_probability: $yes_prob,
                yes_pool: $yes_pool,
                no_pool: $no_pool,
                total_pool: $total_pool,
                closes_at: datetime($deadline + 'T23:59:59Z'),
                settlement_criteria: $settlement_criteria,
                created_at: datetime(),
                updated_at: datetime()
            })
            """,
            {
                "id": uid,
                "short_id": pred["id"],
                "question": pred["question"],
                "status": "open" if pred["status"] == "active" else pred["status"],
                "yes_prob": yes_prob,
                "yes_pool": pred["yesPool"],
                "no_pool": pred["noPool"],
                "total_pool": total_pool,
                "deadline": pred["deadline"],
                "settlement_criteria": pred.get("settlementCriteria", ""),
            },
        )
    print(f"  Created {len(predictions)} prediction markets.")


async def seed_narratives(narratives: list[dict]) -> None:
    """Create Narrative nodes with embedded claims."""
    for nar in narratives:
        uid = short_to_uuid(nar["id"])
        claims_json = json.dumps(nar.get("claims", []), ensure_ascii=False)
        await execute_query(
            """
            CREATE (n:Narrative {
                id: $id,
                short_id: $short_id,
                title: $title,
                description: $title,
                source_name: $source_name,
                source_type: $source_type,
                framing: $framing,
                claims_json: $claims_json,
                missing_context: $missing_context,
                source_refs: $source_refs,
                event_ids: [],
                tags: [],
                created_at: datetime(),
                updated_at: datetime()
            })
            """,
            {
                "id": uid,
                "short_id": nar["id"],
                "title": nar["title"],
                "source_name": nar.get("source", ""),
                "source_type": nar.get("sourceType", ""),
                "framing": nar.get("framing", ""),
                "claims_json": claims_json,
                "missing_context": nar.get("missingContext", []),
                "source_refs": nar.get("sources", []),
            },
        )
    print(f"  Created {len(narratives)} narratives.")


async def seed_claims(claims: list[dict]) -> None:
    """Create Claim nodes."""
    for claim in claims:
        uid = short_to_uuid(claim["id"])
        await execute_query(
            """
            CREATE (c:Claim {
                id: $id,
                short_id: $short_id,
                text: $text,
                status: $status,
                confidence: $confidence,
                sources_for: $sources_for,
                sources_against: $sources_against,
                created_at: datetime(),
                updated_at: datetime()
            })
            """,
            {
                "id": uid,
                "short_id": claim["id"],
                "text": claim["text"],
                "status": claim["status"],
                "confidence": claim["confidence"] / 100.0,
                "sources_for": claim.get("sourcesFor", 0),
                "sources_against": claim.get("sourcesAgainst", 0),
            },
        )
    print(f"  Created {len(claims)} claims.")


async def seed_market_impacts(market_impacts: list[dict]) -> None:
    """Create MarketImpact nodes and link to events."""
    for mi in market_impacts:
        uid = short_to_uuid(mi["id"])
        event_uid = short_to_uuid(mi["eventId"])
        sectors_json = json.dumps(mi["sectors"], ensure_ascii=False)
        await execute_query(
            """
            CREATE (mi:MarketImpact {
                id: $id,
                short_id: $short_id,
                event_id: $event_short_id,
                summary: $summary,
                analysis_date: $analysis_date,
                sectors_json: $sectors_json,
                actual_summary: $actual_summary,
                actual_date: $actual_date,
                prediction_accuracy: $prediction_accuracy,
                created_at: datetime(),
                updated_at: datetime()
            })
            """,
            {
                "id": uid,
                "short_id": mi["id"],
                "event_short_id": mi["eventId"],
                "summary": mi["summary"],
                "analysis_date": mi["analysisDate"],
                "sectors_json": sectors_json,
                "actual_summary": mi.get("actualSummary"),
                "actual_date": mi.get("actualDate"),
                "prediction_accuracy": mi.get("predictionAccuracy"),
            },
        )
        # Link Event -> MarketImpact
        await execute_query(
            """
            MATCH (e:Event {id: $event_id}), (mi:MarketImpact {id: $mi_id})
            CREATE (e)-[:HAS_MARKET_IMPACT]->(mi)
            """,
            {"event_id": event_uid, "mi_id": uid},
        )
    print(f"  Created {len(market_impacts)} market impacts.")


async def seed_meilisearch(all_events: list[dict]) -> None:
    """Index events in Meilisearch for full-text search."""
    try:
        import httpx

        meili_url = settings.meilisearch_url
        meili_key = settings.meilisearch_key
        headers = {"Authorization": f"Bearer {meili_key}"} if meili_key else {}

        documents = [
            {
                "id": short_to_uuid(e["id"]),
                "short_id": e["id"],
                "title": e["title"],
                "description": e["description"],
                "date": e["date"],
                "category": e["category"],
                "status": e["status"],
            }
            for e in all_events
        ]

        async with httpx.AsyncClient() as client:
            # Create or update index
            await client.post(
                f"{meili_url}/indexes",
                json={"uid": "events", "primaryKey": "id"},
                headers=headers,
            )
            # Add documents
            resp = await client.post(
                f"{meili_url}/indexes/events/documents",
                json=documents,
                headers=headers,
            )
            if resp.status_code in (200, 202):
                print(f"  Indexed {len(documents)} events in Meilisearch.")
            else:
                print(f"  Meilisearch indexing returned {resp.status_code}: {resp.text}")
    except Exception as e:
        print(f"  Meilisearch indexing skipped: {e}")


async def seed_scenario(scenario: dict) -> dict:
    """Seed a single scenario. Returns summary counts."""
    prefix = scenario["prefix"]
    files = scenario["files"]

    print(f"\n--- Scenario: {prefix} ---")

    events = load_json(files["events"])
    links = load_json(files["links"])
    agreement = load_json(files["agreement"])
    predictions = load_json(files["predictions"])
    narratives = load_json(files["narratives"])
    claims = load_json(files["claims"])
    market_impacts = load_json(files["market_impacts"])

    await seed_events(events)
    await seed_links(links)
    await seed_agreement(agreement)
    await seed_predictions(predictions)
    await seed_narratives(narratives)
    await seed_claims(claims)
    await seed_market_impacts(market_impacts)

    return {
        "prefix": prefix,
        "events": len(events),
        "links": len(links),
        "obligations": len(agreement["obligations"]),
        "predictions": len(predictions),
        "narratives": len(narratives),
        "claims": len(claims),
        "market_impacts": len(market_impacts),
        "raw_events": events,
    }


async def seed() -> None:
    """Main seed function — loads all scenario JSON and inserts into Neo4j."""
    await init_driver()
    print(f"Seeding Neo4j at {settings.neo4j_uri} ...")

    # Clear existing data
    await clear_database()

    # Seed all scenarios
    all_events: list[dict] = []
    summaries: list[dict] = []

    for scenario in SCENARIOS:
        result = await seed_scenario(scenario)
        all_events.extend(result["raw_events"])
        summaries.append(result)

    # Index all events in Meilisearch
    await seed_meilisearch(all_events)

    await close_driver()

    print("\n=== Done! ===")
    for s in summaries:
        print(f"\n[{s['prefix']}]")
        print(f"  {s['events']} events")
        print(f"  {s['links']} causal links")
        print(f"  1 agreement with {s['obligations']} obligations")
        print(f"  {s['predictions']} prediction markets")
        print(f"  {s['narratives']} narratives")
        print(f"  {s['claims']} claims")
        print(f"  {s['market_impacts']} market impacts")

    total_events = sum(s["events"] for s in summaries)
    print(f"\nTotal: {total_events} events across {len(summaries)} scenarios.")


if __name__ == "__main__":
    asyncio.run(seed())
