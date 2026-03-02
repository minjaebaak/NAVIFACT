"""Pydantic models for the title/badge system."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class TitleCategory(StrEnum):
    PREDICTION = "prediction"
    ACTIVITY = "activity"
    DEBATE = "debate"


class TitleResponse(BaseModel):
    """A title definition."""

    id: UUID
    name: str
    description: str
    category: TitleCategory
    tier: int = Field(ge=0)
    icon: str
    min_accuracy: float | None = None
    min_bets: int | None = None
    min_comments: int | None = None
    min_upvotes_received: int | None = None
    min_good_perspectives: int | None = None
    min_fair_points: int | None = None
    min_persuasives: int | None = None


class UserTitleResponse(BaseModel):
    """A title earned by a user."""

    title: TitleResponse
    earned_at: datetime
    is_active: bool = False


class SetActiveTitleRequest(BaseModel):
    """Request to set the user's display title."""

    title_id: UUID
