"""Pydantic models for market impact analysis."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class StockImpactResponse(BaseModel):
    ticker: str
    name: str
    exchange: str
    direction: str  # positive | negative | neutral
    reasoning: str


class SectorImpactResponse(BaseModel):
    sector: str
    direction: str  # positive | negative | neutral
    magnitude: str  # high | medium | low
    reasoning: str
    region: str  # KR | US | GLOBAL
    stocks: list[StockImpactResponse] = Field(default_factory=list)


class MarketImpactResponse(BaseModel):
    id: UUID
    short_id: str | None = None
    event_id: str | None = None
    summary: str
    analysis_date: str | None = None
    sectors: list[SectorImpactResponse] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime
