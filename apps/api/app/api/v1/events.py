"""Event endpoints — CRUD and causal-chain retrieval."""

from uuid import UUID

from fastapi import APIRouter, HTTPException, Query, status

from app.models.common import PaginatedResponse
from app.models.event import (
    CausalChainResponse,
    CausalLinkDirection,
    EventCreate,
    EventResponse,
)
from app.services import event_service, graph_service

router = APIRouter()


@router.get("", response_model=PaginatedResponse[EventResponse])
async def list_events(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category: str | None = Query(None),
) -> PaginatedResponse[EventResponse]:
    """Return a paginated list of historical events."""
    return await event_service.list_events(page=page, page_size=page_size, category=category)


@router.get("/{event_id}", response_model=EventResponse)
async def get_event(event_id: UUID) -> EventResponse:
    """Return a single event by ID."""
    event = await event_service.get_event(event_id)
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return event


@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
async def create_event(payload: EventCreate) -> EventResponse:
    """Create a new historical event."""
    return await event_service.create_event(payload)


@router.get("/{event_id}/causal-chain", response_model=CausalChainResponse)
async def get_causal_chain(
    event_id: UUID,
    direction: CausalLinkDirection = Query(CausalLinkDirection.DOWNSTREAM),
    depth: int = Query(3, ge=1, le=10),
    min_confidence: float = Query(0.0, ge=0, le=1),
) -> CausalChainResponse:
    """Traverse causal links from an event.

    - **direction**: ``upstream``, ``downstream``, or ``both``
    - **depth**: maximum traversal depth (1-10)
    - **min_confidence**: minimum edge confidence threshold
    """
    return await graph_service.get_causal_chain(
        event_id=event_id,
        direction=direction,
        depth=depth,
        min_confidence=min_confidence,
    )
