"""Market impact router — stock/sector impact analysis per event."""

from fastapi import APIRouter, Query

from app.models.common import PaginatedResponse
from app.models.market_impact import MarketImpactResponse
from app.services import market_impact_service

router = APIRouter()


@router.get("", response_model=PaginatedResponse[MarketImpactResponse])
async def list_market_impacts(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
) -> PaginatedResponse[MarketImpactResponse]:
    return await market_impact_service.list_market_impacts(page=page, page_size=page_size)


@router.get("/by-event/{event_id}", response_model=list[MarketImpactResponse])
async def get_market_impacts_by_event(event_id: str) -> list[MarketImpactResponse]:
    return await market_impact_service.get_market_impacts_by_event(event_id)
