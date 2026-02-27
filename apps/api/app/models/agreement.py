"""Pydantic models for agreements, obligations, and compliance."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class ObligationStatus(StrEnum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    FULFILLED = "fulfilled"
    VIOLATED = "violated"
    EXPIRED = "expired"


class AgreementType(StrEnum):
    TREATY = "treaty"
    TRADE_DEAL = "trade_deal"
    CEASEFIRE = "ceasefire"
    SANCTIONS = "sanctions"
    ALLIANCE = "alliance"
    RESOLUTION = "resolution"
    OTHER = "other"


class ObligationCreate(BaseModel):
    """Payload for creating an obligation under an agreement."""

    title: str = Field(..., min_length=1, max_length=300)
    description: str
    responsible_party: str
    deadline: datetime | None = None


class ObligationResponse(BaseModel):
    """Full obligation representation."""

    id: UUID
    agreement_id: UUID
    title: str
    description: str
    responsible_party: str
    status: ObligationStatus = ObligationStatus.PENDING
    deadline: datetime | None = None
    fulfilled_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class AgreementCreate(BaseModel):
    """Payload for creating a new agreement."""

    title: str = Field(..., min_length=1, max_length=300)
    description: str
    agreement_type: AgreementType
    signed_date: datetime
    parties: list[str] = Field(..., min_length=1)
    event_id: UUID | None = None
    source_urls: list[str] = Field(default_factory=list)


class AgreementResponse(BaseModel):
    """Full agreement representation."""

    id: UUID
    title: str
    description: str
    agreement_type: AgreementType
    signed_date: datetime
    parties: list[str]
    event_id: UUID | None = None
    source_urls: list[str] = Field(default_factory=list)
    obligations: list[ObligationResponse] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime


class ComplianceScore(BaseModel):
    """Compliance scorecard for a single party."""

    party: str
    total_obligations: int = Field(ge=0)
    fulfilled: int = Field(ge=0)
    violated: int = Field(ge=0)
    pending: int = Field(ge=0)
    score: float = Field(ge=0, le=1, description="Fraction of obligations fulfilled")


class ComplianceScorecard(BaseModel):
    """Aggregated compliance scorecard across all parties."""

    agreement_id: UUID
    overall_score: float = Field(ge=0, le=1)
    party_scores: list[ComplianceScore]
