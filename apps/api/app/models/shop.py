"""Pydantic models for the point shop — cosmetic items and inventory."""

from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field


class ShopCategory(StrEnum):
    EMOJI = "emoji"
    PROFILE_BORDER = "profile_border"
    PROFILE_BACKGROUND = "profile_background"
    COMMENT_EFFECT = "comment_effect"
    BADGE_STYLE = "badge_style"
    THEME = "theme"


class ShopItemResponse(BaseModel):
    """A purchasable cosmetic item."""

    id: UUID
    short_id: str | None = None
    name: str
    description: str
    category: ShopCategory
    price: int = Field(ge=0)
    rarity: str = "common"  # common, rare, epic, legendary
    preview_url: str | None = None
    emoji_code: str | None = None
    is_active: bool = True


class UserItemResponse(BaseModel):
    """An item owned by a user."""

    item: ShopItemResponse
    purchased_at: datetime
    equipped: bool = False


class PurchaseRequest(BaseModel):
    """Payload for buying an item."""

    item_id: UUID


class EquipRequest(BaseModel):
    """Payload for equipping/unequipping."""

    item_id: UUID
