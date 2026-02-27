"""Graph visualisation endpoints — subgraphs and shortest paths."""

from uuid import UUID

from fastapi import APIRouter, Query

from app.models.graph import ShortestPathResponse, SubgraphResponse
from app.services import graph_service

router = APIRouter()


@router.get("/subgraph", response_model=SubgraphResponse)
async def get_subgraph(
    center_event_id: UUID = Query(..., description="Centre event for the subgraph"),
    radius: int = Query(2, ge=1, le=5, description="Maximum hop distance"),
) -> SubgraphResponse:
    """Return a renderable subgraph centred on a given event."""
    return await graph_service.get_subgraph(
        center_event_id=center_event_id,
        radius=radius,
    )


@router.get("/path", response_model=ShortestPathResponse)
async def get_shortest_path(
    from_event_id: UUID = Query(..., description="Starting event"),
    to_event_id: UUID = Query(..., description="Target event"),
) -> ShortestPathResponse:
    """Find the shortest causal path between two events."""
    return await graph_service.get_shortest_path(
        from_id=from_event_id,
        to_id=to_event_id,
    )
