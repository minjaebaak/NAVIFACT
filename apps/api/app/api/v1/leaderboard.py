"""Leaderboard endpoint."""

from fastapi import APIRouter, Query

from app.models.common import PaginatedResponse
from app.models.leaderboard import LeaderboardEntry
from app.services import leaderboard_service

router = APIRouter()


@router.get("", response_model=PaginatedResponse[LeaderboardEntry])
async def get_leaderboard(
    type: str = Query("accuracy", description="accuracy, points, or activity"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
) -> PaginatedResponse[LeaderboardEntry]:
    """Return the leaderboard of the given type."""
    return await leaderboard_service.get_leaderboard(
        board_type=type,
        page=page,
        page_size=page_size,
    )
