"""Title endpoints — list titles and manage user badges."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.auth import get_current_user
from app.models.title import SetActiveTitleRequest, TitleResponse, UserTitleResponse
from app.services import title_service

router = APIRouter()


@router.get("", response_model=list[TitleResponse])
async def list_titles() -> list[TitleResponse]:
    """Return all title definitions."""
    return await title_service.get_all_titles()


@router.get("/mine", response_model=list[UserTitleResponse])
async def get_my_titles(
    current_user: dict = Depends(get_current_user),
) -> list[UserTitleResponse]:
    """Return titles earned by the authenticated user."""
    return await title_service.get_user_titles(UUID(current_user["sub"]))


@router.put("/active")
async def set_active_title(
    payload: SetActiveTitleRequest,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Set the user's display title."""
    ok = await title_service.set_active_title(
        user_id=UUID(current_user["sub"]),
        title_id=payload.title_id,
    )
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title not owned or not found",
        )
    return {"ok": True}
