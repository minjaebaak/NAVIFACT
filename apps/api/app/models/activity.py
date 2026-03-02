"""Pydantic models for user activity logs."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel


class ActivityAction(StrEnum):
    BET_PLACED = "bet_placed"
    BET_WON = "bet_won"
    BET_LOST = "bet_lost"
    COMMENT_CREATED = "comment_created"
    VOTE_CAST = "vote_cast"
    VOTE_RECEIVED = "vote_received"
    TITLE_EARNED = "title_earned"
    TITLE_LOST = "title_lost"
    SIGNUP = "signup"


class ActivityResponse(BaseModel):
    """Public activity representation."""

    id: UUID
    user_id: UUID
    action: ActivityAction
    summary: str
    metadata: dict | None = None
    created_at: datetime
