"""Pydantic models for discussions and comments."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class TargetType(StrEnum):
    EVENT = "event"
    PREDICTION = "prediction"


class VoteType(StrEnum):
    UP = "up"
    DOWN = "down"
    GOOD_PERSPECTIVE = "good_perspective"
    FAIR_POINT = "fair_point"
    PERSUASIVE = "persuasive"


class DiscussionCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    target_type: TargetType
    target_id: str


class DiscussionResponse(BaseModel):
    id: UUID
    title: str
    target_type: TargetType
    target_id: str
    comment_count: int = 0
    created_at: datetime


class CommentCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=2000)
    parent_id: UUID | None = None


class CommentAuthor(BaseModel):
    id: UUID
    username: str
    active_title: str | None = None


class CommentResponse(BaseModel):
    id: UUID
    content: str
    author: CommentAuthor
    parent_id: UUID | None = None
    upvotes: int = 0
    downvotes: int = 0
    good_perspectives: int = 0
    fair_points: int = 0
    persuasives: int = 0
    my_vote: str | None = None
    created_at: datetime
    replies: list["CommentResponse"] = []


class VoteCreate(BaseModel):
    vote_type: VoteType
