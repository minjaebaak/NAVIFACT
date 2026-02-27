"""Claim endpoints — fact-checked assertions about events."""

from uuid import UUID

from fastapi import APIRouter, HTTPException, Query, status

from app.db.neo4j import execute_query
from app.models.claim import ClaimCreate, ClaimResponse

router = APIRouter()


@router.get("", response_model=list[ClaimResponse])
async def list_claims(
    event_id: UUID | None = Query(None),
    verdict: str | None = Query(None),
) -> list[ClaimResponse]:
    """List claims, optionally filtered by event or verdict."""
    conditions: list[str] = []
    params: dict = {}

    if event_id:
        conditions.append("c.event_id = $event_id")
        params["event_id"] = str(event_id)
    if verdict:
        conditions.append("c.verdict = $verdict")
        params["verdict"] = verdict

    where = f"WHERE {' AND '.join(conditions)}" if conditions else ""
    query = f"MATCH (c:Claim) {where} RETURN c ORDER BY c.created_at DESC"

    records = await execute_query(query, params)
    return [_node_to_claim(r["c"]) for r in records]


@router.get("/{claim_id}", response_model=ClaimResponse)
async def get_claim(claim_id: UUID) -> ClaimResponse:
    """Get a single claim by ID."""
    records = await execute_query(
        "MATCH (c:Claim {id: $id}) RETURN c",
        {"id": str(claim_id)},
    )
    if not records:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Claim not found")
    return _node_to_claim(records[0]["c"])


@router.post("", response_model=ClaimResponse, status_code=status.HTTP_201_CREATED)
async def create_claim(payload: ClaimCreate) -> ClaimResponse:
    """Create a new claim attached to an event."""
    query = """
        CREATE (c:Claim {
            id: randomUUID(),
            statement: $statement,
            event_id: $event_id,
            source_url: $source_url,
            verdict: 'unverified',
            confidence: 0.0,
            evidence_urls: [],
            created_at: datetime(),
            updated_at: datetime()
        })
        RETURN c
    """
    records = await execute_query(
        query,
        {
            "statement": payload.statement,
            "event_id": str(payload.event_id),
            "source_url": payload.source_url or "",
        },
    )
    return _node_to_claim(records[0]["c"])


def _node_to_claim(node: dict) -> ClaimResponse:
    props = dict(node)
    return ClaimResponse(
        id=props["id"],
        statement=props["statement"],
        event_id=props["event_id"],
        verdict=props.get("verdict", "unverified"),
        confidence=props.get("confidence", 0.0),
        evidence_urls=props.get("evidence_urls", []),
        created_at=props["created_at"],
        updated_at=props["updated_at"],
    )
