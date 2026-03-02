"""Pydantic models for prediction markets, bets, and point transactions."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class MarketStatus(StrEnum):
    OPEN = "open"
    CLOSED = "closed"
    RESOLVED_YES = "resolved_yes"
    RESOLVED_NO = "resolved_no"


class BetSide(StrEnum):
    YES = "yes"
    NO = "no"


class PredictionMarketCreate(BaseModel):
    """Payload for creating a prediction market."""

    question: str = Field(..., min_length=1, max_length=500)
    description: str
    event_id: UUID | None = None
    closes_at: datetime


class PredictionMarketResponse(BaseModel):
    """Full prediction market representation."""

    id: UUID
    question: str
    description: str
    event_id: UUID | None = None
    status: MarketStatus = MarketStatus.OPEN
    yes_probability: float = Field(ge=0, le=1, default=0.5)
    total_pool: int = Field(ge=0, default=0)
    closes_at: datetime
    resolved_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class BetCreate(BaseModel):
    """Payload for placing a bet."""

    side: BetSide
    amount: int = Field(gt=0, description="Points wagered")


class BetResponse(BaseModel):
    """Full bet representation."""

    id: UUID
    market_id: UUID
    user_id: UUID
    side: BetSide
    amount: int
    placed_at: datetime


class PointTransaction(BaseModel):
    """Record of a point credit/debit."""

    id: UUID
    user_id: UUID
    amount: int
    reason: str
    reference_id: UUID | None = None
    balance_after: int | None = None
    created_at: datetime
