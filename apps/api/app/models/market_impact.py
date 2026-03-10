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
    # Actual outcome
    actual_change: float | None = None
    actual_period: str | None = None
    actual_reasoning: str | None = None


class SectorImpactResponse(BaseModel):
    sector: str
    direction: str  # positive | negative | neutral
    magnitude: str  # high | medium | low
    reasoning: str
    region: str  # KR | US | GLOBAL
    stocks: list[StockImpactResponse] = Field(default_factory=list)
    # Actual outcome
    actual_direction: str | None = None  # positive | negative | neutral
    actual_magnitude: str | None = None  # high | medium | low
    actual_reasoning: str | None = None


class MarketImpactResponse(BaseModel):
    id: UUID
    short_id: str | None = None
    event_id: str | None = None
    summary: str
    analysis_date: str | None = None
    sectors: list[SectorImpactResponse] = Field(default_factory=list)
    # Actual outcome
    actual_summary: str | None = None
    actual_date: str | None = None
    prediction_accuracy: float | None = None
    created_at: datetime
    updated_at: datetime
