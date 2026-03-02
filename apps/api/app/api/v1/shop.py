"""Shop router — browse and purchase cosmetic items."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.core.auth import get_current_user
from app.models.shop import (
    PurchaseRequest,
    ShopItemResponse,
    UserItemResponse,
)
from app.services import shop_service

router = APIRouter()


@router.get("/items", response_model=list[ShopItemResponse])
async def list_items(category: str | None = None) -> list[ShopItemResponse]:
    """List all active shop items, optionally filtered by category."""
    return await shop_service.list_items(category)


@router.get("/items/{item_id}", response_model=ShopItemResponse)
async def get_item(item_id: UUID) -> ShopItemResponse:
    """Get details of a single shop item."""
    item = await shop_service.get_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="아이템을 찾을 수 없습니다.")
    return item


@router.post("/purchase")
async def purchase_item(
    body: PurchaseRequest,
    user: dict = Depends(get_current_user),
) -> dict:
    """Purchase an item with points. Atomic: checks balance, deducts, grants."""
    try:
        result = await shop_service.purchase_item(
            UUID(user["sub"]), body.item_id
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/inventory", response_model=list[UserItemResponse])
async def get_inventory(
    user: dict = Depends(get_current_user),
) -> list[UserItemResponse]:
    """List all items owned by the authenticated user."""
    return await shop_service.get_inventory(UUID(user["sub"]))


@router.put("/inventory/{item_id}/equip")
async def equip_item(
    item_id: UUID,
    user: dict = Depends(get_current_user),
) -> dict:
    """Equip a cosmetic item. Unequips other items of the same category."""
    await shop_service.equip_item(UUID(user["sub"]), item_id)
    return {"status": "equipped"}


@router.put("/inventory/{item_id}/unequip")
async def unequip_item(
    item_id: UUID,
    user: dict = Depends(get_current_user),
) -> dict:
    """Unequip a cosmetic item."""
    await shop_service.unequip_item(UUID(user["sub"]), item_id)
    return {"status": "unequipped"}
