"""Pydantic models for historical events and causal links."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class EventCategory(StrEnum):
    POLITICAL = "political"
    ECONOMIC = "economic"
    MILITARY = "military"
    SOCIAL = "social"
    TECHNOLOGICAL = "technological"
    ENVIRONMENTAL = "environmental"
    CULTURAL = "cultural"
    LEGAL = "legal"


class EventCreate(BaseModel):
    """Payload for creating a new event."""

    title: str = Field(..., min_length=1, max_length=300)
    description: str = Field(..., min_length=1)
    date: datetime
    location: str | None = None
    category: EventCategory
    source_urls: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)


class EventUpdate(BaseModel):
    """Payload for partially updating an event."""

    title: str | None = None
    description: str | None = None
    date: datetime | None = None
    location: str | None = None
    category: EventCategory | None = None
    source_urls: list[str] | None = None
    tags: list[str] | None = None


class EventResponse(BaseModel):
    """Full event representation returned by the API."""

    id: UUID
    title: str
    description: str
    date: datetime
    location: str | None = None
    category: EventCategory
    source_urls: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    credibility_score: float = Field(ge=0, le=1, default=0.0)
    created_at: datetime
    updated_at: datetime


class CausalLinkDirection(StrEnum):
    UPSTREAM = "upstream"
    DOWNSTREAM = "downstream"
    BOTH = "both"


class CausalLink(BaseModel):
    """A directed cause-effect edge between two events."""

    source_event_id: UUID
    target_event_id: UUID
    relationship_type: str = "CAUSED"
    confidence: float = Field(ge=0, le=1)
    description: str | None = None
    source_urls: list[str] = Field(default_factory=list)


class CausalChainResponse(BaseModel):
    """Result of a causal-chain traversal."""

    root_event_id: UUID
    direction: CausalLinkDirection
    depth: int
    events: list[EventResponse]
    links: list[CausalLink]
