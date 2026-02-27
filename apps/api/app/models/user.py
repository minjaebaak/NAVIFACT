"""Pydantic models for users and authentication tokens."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserRole(StrEnum):
    VIEWER = "viewer"
    EDITOR = "editor"
    ADMIN = "admin"


class UserCreate(BaseModel):
    """Payload for registering a new user."""

    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)


class UserResponse(BaseModel):
    """Public user representation."""

    id: UUID
    email: EmailStr
    username: str
    role: UserRole = UserRole.VIEWER
    points: int = Field(ge=0, default=0)
    created_at: datetime


class TokenPair(BaseModel):
    """JWT access + refresh token pair."""

    access_token: str
    refresh_token: str | None = None
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    """Credentials for logging in."""

    email: EmailStr
    password: str
