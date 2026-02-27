"""Pydantic models for narratives — curated storylines of events."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class NarrativeCreate(BaseModel):
    """Payload for creating a narrative."""

    title: str = Field(..., min_length=1, max_length=300)
    description: str
    event_ids: list[UUID] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)


class NarrativeClaim(BaseModel):
    """A claim embedded within a narrative."""

    text: str
    status: str = "unverified"
    confidence: int = 0


class NarrativeResponse(BaseModel):
    """Full narrative representation."""

    id: UUID
    title: str
    description: str
    event_ids: list[UUID] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    author_id: UUID | None = None
    source_name: str | None = None
    source_type: str | None = None
    framing: str | None = None
    claims: list[NarrativeClaim] = Field(default_factory=list)
    missing_context: list[str] = Field(default_factory=list)
    source_refs: list[str] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime
