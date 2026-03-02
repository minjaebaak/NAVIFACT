"""Points endpoints — balance and transaction history."""

from uuid import UUID

from fastapi import APIRouter, Depends

from app.core.auth import get_current_user
from app.models.common import PaginatedResponse
from app.models.prediction import PointTransaction
from app.services import point_service

router = APIRouter()


@router.get("/balance")
async def get_balance(
    user: dict = Depends(get_current_user),
) -> dict:
    """Return the current point balance for the authenticated user."""
    balance = await point_service.get_balance(UUID(user["sub"]))
    return {"balance": balance}


@router.get("/transactions", response_model=PaginatedResponse[PointTransaction])
async def get_transactions(
    page: int = 1,
    page_size: int = 20,
    user: dict = Depends(get_current_user),
) -> PaginatedResponse[PointTransaction]:
    """Return paginated point transaction history."""
    return await point_service.get_transactions(
        user_id=UUID(user["sub"]),
        page=page,
        page_size=page_size,
    )
