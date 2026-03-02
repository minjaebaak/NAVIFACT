"""Pydantic models for leaderboard entries."""

from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel


class LeaderboardType(StrEnum):
    ACCURACY = "accuracy"
    POINTS = "points"
    ACTIVITY = "activity"


class LeaderboardEntry(BaseModel):
    rank: int
    user_id: UUID
    username: str
    active_title: str | None = None
    score: float
    total_bets: int = 0
    correct_bets: int = 0
    points: int = 0
