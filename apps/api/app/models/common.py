"""Common / shared Pydantic models — pagination, errors, etc."""

from typing import Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    """Generic paginated list response."""

    items: list[T]
    total: int = Field(ge=0, description="Total number of matching items")
    page: int = Field(ge=1, description="Current page number (1-based)")
    page_size: int = Field(ge=1, description="Items per page")
    total_pages: int = Field(ge=0, description="Total number of pages")


class ErrorResponse(BaseModel):
    """Standard error payload returned by the API."""

    detail: str
    code: str | None = None


class ErrorDetail(BaseModel):
    """Richer error body when multiple issues are reported."""

    loc: list[str] | None = None
    msg: str
    type: str
