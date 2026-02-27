"""Prediction market endpoints — markets, bets, and outcomes."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.auth import get_current_user
from app.models.common import PaginatedResponse
from app.models.prediction import BetCreate, BetResponse, PredictionMarketResponse
from app.services import prediction_service

router = APIRouter()


@router.get("", response_model=PaginatedResponse[PredictionMarketResponse])
async def list_active_markets(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
) -> PaginatedResponse[PredictionMarketResponse]:
    """List currently open prediction markets."""
    return await prediction_service.list_active_markets(page=page, page_size=page_size)


@router.get("/{market_id}", response_model=PredictionMarketResponse)
async def get_market(market_id: UUID) -> PredictionMarketResponse:
    """Get a single prediction market."""
    result = await prediction_service.get_market(market_id)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prediction market not found",
        )
    return result


@router.post(
    "/{market_id}/bet",
    response_model=BetResponse,
    status_code=status.HTTP_201_CREATED,
)
async def place_bet(
    market_id: UUID,
    payload: BetCreate,
    current_user: dict = Depends(get_current_user),
) -> BetResponse:
    """Place a bet on a prediction market (requires authentication)."""
    try:
        return await prediction_service.place_bet(
            market_id=market_id,
            user_id=UUID(current_user["sub"]),
            payload=payload,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
