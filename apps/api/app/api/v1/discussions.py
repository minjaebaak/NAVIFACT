"""Discussion endpoints — threads, comments, and votes."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status

from app.core.auth import get_current_user
from app.models.common import PaginatedResponse
from app.models.discussion import (
    CommentCreate,
    CommentResponse,
    DiscussionResponse,
    VoteCreate,
)
from app.services import discussion_service

router = APIRouter()


@router.get("", response_model=DiscussionResponse)
async def get_discussion(
    target_type: str = Query(..., description="event or prediction"),
    target_id: str = Query(...),
) -> DiscussionResponse:
    """Get or create a discussion for a target entity."""
    return await discussion_service.get_or_create_discussion(
        target_type=target_type,
        target_id=target_id,
    )


@router.get("/{discussion_id}/comments", response_model=PaginatedResponse[CommentResponse])
async def list_comments(
    discussion_id: UUID,
    request: Request,
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=100),
) -> PaginatedResponse[CommentResponse]:
    """List comments in a discussion with nested replies.
    If Authorization header present, includes my_vote for each comment."""
    current_user_id: UUID | None = None
    auth_header = request.headers.get("authorization", "")
    if auth_header.startswith("Bearer "):
        try:
            from app.core.auth import decode_access_token
            payload = decode_access_token(auth_header.split(" ", 1)[1])
            current_user_id = UUID(payload["sub"])
        except Exception:
            pass  # Anonymous access — no my_vote
    return await discussion_service.list_comments(
        discussion_id=discussion_id,
        page=page,
        page_size=page_size,
        current_user_id=current_user_id,
    )


@router.post(
    "/{discussion_id}/comments",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_comment(
    discussion_id: UUID,
    payload: CommentCreate,
    current_user: dict = Depends(get_current_user),
) -> CommentResponse:
    """Post a comment (requires authentication)."""
    try:
        return await discussion_service.create_comment(
            discussion_id=discussion_id,
            user_id=UUID(current_user["sub"]),
            payload=payload,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc


@router.post("/comments/{comment_id}/vote")
async def vote_comment(
    comment_id: UUID,
    payload: VoteCreate,
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Vote on a comment (requires authentication)."""
    return await discussion_service.vote_comment(
        comment_id=comment_id,
        user_id=UUID(current_user["sub"]),
        vote_type=payload.vote_type.value,
    )


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    comment_id: UUID,
    current_user: dict = Depends(get_current_user),
) -> None:
    """Delete a comment (own or admin)."""
    is_admin = current_user.get("role") == "admin"
    ok = await discussion_service.delete_comment(
        comment_id=comment_id,
        user_id=UUID(current_user["sub"]),
        is_admin=is_admin,
    )
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found or not authorized",
        )
