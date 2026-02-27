"""Pydantic models for fact-checked claims."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class ClaimVerdict(StrEnum):
    TRUE = "true"
    FALSE = "false"
    PARTIALLY_TRUE = "partially_true"
    UNVERIFIED = "unverified"
    DISPUTED = "disputed"


class ClaimCreate(BaseModel):
    """Payload for creating a new claim."""

    statement: str = Field(..., min_length=1)
    event_id: UUID
    source_url: str | None = None


class ClaimResponse(BaseModel):
    """Full claim representation."""

    id: UUID
    statement: str
    event_id: UUID
    verdict: ClaimVerdict = ClaimVerdict.UNVERIFIED
    confidence: float = Field(ge=0, le=1, default=0.0)
    evidence_urls: list[str] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime
