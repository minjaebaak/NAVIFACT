"""Narrative endpoints — curated storylines of linked events."""

from uuid import UUID

from fastapi import APIRouter, HTTPException, Query, status

from app.db.neo4j import execute_query
from app.models.narrative import NarrativeCreate, NarrativeResponse

router = APIRouter()


@router.get("", response_model=list[NarrativeResponse])
async def list_narratives(
    tag: str | None = Query(None),
) -> list[NarrativeResponse]:
    """List narratives, optionally filtered by tag."""
    if tag:
        query = """
            MATCH (n:Narrative)
            WHERE $tag IN n.tags
            RETURN n ORDER BY n.created_at DESC
        """
        params = {"tag": tag}
    else:
        query = "MATCH (n:Narrative) RETURN n ORDER BY n.created_at DESC"
        params = {}

    records = await execute_query(query, params)
    return [_node_to_narrative(r["n"]) for r in records]


@router.get("/{narrative_id}", response_model=NarrativeResponse)
async def get_narrative(narrative_id: UUID) -> NarrativeResponse:
    """Get a single narrative by ID."""
    records = await execute_query(
        "MATCH (n:Narrative {id: $id}) RETURN n",
        {"id": str(narrative_id)},
    )
    if not records:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Narrative not found",
        )
    return _node_to_narrative(records[0]["n"])


@router.post("", response_model=NarrativeResponse, status_code=status.HTTP_201_CREATED)
async def create_narrative(payload: NarrativeCreate) -> NarrativeResponse:
    """Create a new narrative."""
    query = """
        CREATE (n:Narrative {
            id: randomUUID(),
            title: $title,
            description: $description,
            event_ids: $event_ids,
            tags: $tags,
            created_at: datetime(),
            updated_at: datetime()
        })
        RETURN n
    """
    records = await execute_query(
        query,
        {
            "title": payload.title,
            "description": payload.description,
            "event_ids": [str(eid) for eid in payload.event_ids],
            "tags": payload.tags,
        },
    )
    return _node_to_narrative(records[0]["n"])


def _node_to_narrative(node: dict) -> NarrativeResponse:
    props = dict(node)
    return NarrativeResponse(
        id=props["id"],
        title=props["title"],
        description=props["description"],
        event_ids=props.get("event_ids", []),
        tags=props.get("tags", []),
        author_id=props.get("author_id"),
        created_at=props["created_at"],
        updated_at=props["updated_at"],
    )
