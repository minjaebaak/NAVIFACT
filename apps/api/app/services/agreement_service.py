"""Agreement service — CRUD and compliance scoring."""

from uuid import UUID

from app.db.neo4j import execute_query
from app.models.agreement import (
    AgreementResponse,
    ComplianceScore,
    ComplianceScorecard,
    ObligationResponse,
    ObligationStatus,
)


async def get_agreement(agreement_id: UUID) -> AgreementResponse | None:
    """Fetch an agreement and its obligations."""
    query = """
        MATCH (a:Agreement {id: $id})
        OPTIONAL MATCH (a)-[:HAS_OBLIGATION]->(o:Obligation)
        RETURN a, COLLECT(o) AS obligations
    """
    records = await execute_query(query, {"id": str(agreement_id)})
    if not records:
        return None

    record = records[0]
    a_props = dict(record["a"])
    obligations = [_node_to_obligation(o, agreement_id) for o in record["obligations"] if o]

    return AgreementResponse(
        id=a_props["id"],
        title=a_props["title"],
        description=a_props["description"],
        agreement_type=a_props["agreement_type"],
        signed_date=a_props["signed_date"],
        parties=a_props.get("parties", []),
        event_id=a_props.get("event_id"),
        source_urls=a_props.get("source_urls", []),
        obligations=obligations,
        created_at=a_props["created_at"],
        updated_at=a_props["updated_at"],
    )


async def get_obligations(agreement_id: UUID) -> list[ObligationResponse]:
    """Return all obligations belonging to an agreement."""
    query = """
        MATCH (a:Agreement {id: $id})-[:HAS_OBLIGATION]->(o:Obligation)
        RETURN o
        ORDER BY o.deadline ASC
    """
    records = await execute_query(query, {"id": str(agreement_id)})
    return [_node_to_obligation(r["o"], agreement_id) for r in records]


async def get_compliance_scorecard(agreement_id: UUID) -> ComplianceScorecard:
    """Compute compliance scorecard grouped by responsible party."""
    query = """
        MATCH (a:Agreement {id: $id})-[:HAS_OBLIGATION]->(o:Obligation)
        RETURN o.responsible_party AS party,
               o.status AS status,
               count(*) AS cnt
    """
    records = await execute_query(query, {"id": str(agreement_id)})

    party_data: dict[str, dict[str, int]] = {}
    for rec in records:
        party = rec["party"]
        status = rec["status"]
        cnt = rec["cnt"]
        if party not in party_data:
            party_data[party] = {"total": 0, "fulfilled": 0, "violated": 0, "pending": 0}
        party_data[party]["total"] += cnt
        if status == ObligationStatus.FULFILLED:
            party_data[party]["fulfilled"] += cnt
        elif status == ObligationStatus.VIOLATED:
            party_data[party]["violated"] += cnt
        else:
            party_data[party]["pending"] += cnt

    party_scores: list[ComplianceScore] = []
    total_fulfilled = 0
    total_all = 0
    for party, d in party_data.items():
        score = d["fulfilled"] / d["total"] if d["total"] > 0 else 0.0
        party_scores.append(
            ComplianceScore(
                party=party,
                total_obligations=d["total"],
                fulfilled=d["fulfilled"],
                violated=d["violated"],
                pending=d["pending"],
                score=score,
            )
        )
        total_fulfilled += d["fulfilled"]
        total_all += d["total"]

    overall = total_fulfilled / total_all if total_all > 0 else 0.0

    return ComplianceScorecard(
        agreement_id=agreement_id,
        overall_score=overall,
        party_scores=party_scores,
    )


def _node_to_obligation(node: dict, agreement_id: UUID) -> ObligationResponse:
    props = dict(node)
    return ObligationResponse(
        id=props["id"],
        agreement_id=agreement_id,
        title=props["title"],
        description=props["description"],
        responsible_party=props["responsible_party"],
        status=props.get("status", ObligationStatus.PENDING),
        deadline=props.get("deadline"),
        fulfilled_at=props.get("fulfilled_at"),
        created_at=props["created_at"],
        updated_at=props["updated_at"],
    )
