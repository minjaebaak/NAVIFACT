"""Shop service — browse, purchase, and equip cosmetic items."""

from uuid import UUID

from app.db.neo4j import execute_query
from app.models.shop import ShopItemResponse, UserItemResponse
from app.services.event_service import _neo4j_to_python_datetime


async def list_items(category: str | None = None) -> list[ShopItemResponse]:
    """Return all active shop items, optionally filtered by category."""
    where = "WHERE i.is_active = true"
    params: dict = {}
    if category:
        where += " AND i.category = $category"
        params["category"] = category

    records = await execute_query(
        f"MATCH (i:ShopItem) {where} RETURN i ORDER BY i.price ASC",
        params,
    )
    return [_node_to_item(r["i"]) for r in records]


async def get_item(item_id: UUID) -> ShopItemResponse | None:
    """Fetch a single shop item."""
    records = await execute_query(
        "MATCH (i:ShopItem {id: $id}) RETURN i",
        {"id": str(item_id)},
    )
    if not records:
        return None
    return _node_to_item(records[0]["i"])


async def purchase_item(user_id: UUID, item_id: UUID) -> dict:
    """Atomically purchase an item: check balance → deduct → grant ownership.

    Returns {"balance": int, "item": ShopItemResponse} on success.
    Raises ValueError on insufficient funds, already owned, or item not found.
    """
    query = """
        MATCH (u:User {id: $user_id}), (item:ShopItem {id: $item_id})
        WHERE item.is_active = true
        AND NOT EXISTS { MATCH (u)-[:OWNS]->(item) }
        AND u.points >= item.price
        SET u.points = u.points - item.price
        WITH u, item
        CREATE (u)-[:OWNS {purchased_at: datetime(), equipped: false}]->(item)
        CREATE (t:PointTransaction {
            id: randomUUID(),
            user_id: $user_id,
            amount: -item.price,
            reason: "shop_purchase",
            reference_id: item.id,
            balance_after: u.points,
            created_at: datetime()
        })
        CREATE (u)-[:HAS_TRANSACTION]->(t)
        RETURN u.points AS balance, item
    """
    records = await execute_query(
        query,
        {"user_id": str(user_id), "item_id": str(item_id)},
    )
    if not records:
        # Determine why it failed
        check = await execute_query(
            """
            MATCH (item:ShopItem {id: $item_id})
            OPTIONAL MATCH (u:User {id: $user_id})
            OPTIONAL MATCH (u)-[o:OWNS]->(item)
            RETURN item.price AS price, u.points AS points, o IS NOT NULL AS already_owned
            """,
            {"user_id": str(user_id), "item_id": str(item_id)},
        )
        if not check:
            raise ValueError("아이템을 찾을 수 없습니다.")
        row = check[0]
        if row["already_owned"]:
            raise ValueError("이미 보유한 아이템입니다.")
        if row["points"] is not None and row["points"] < row["price"]:
            raise ValueError(
                f"포인트가 부족합니다. (보유: {row['points']}P, 필요: {row['price']}P)"
            )
        raise ValueError("구매할 수 없습니다.")

    # Log activity
    from app.services.activity_service import log_activity

    item_data = _node_to_item(records[0]["item"])
    await log_activity(
        user_id,
        "shop_purchase",
        f"{item_data.name} 구매 (-{item_data.price}P)",
    )

    return {"balance": records[0]["balance"], "item": item_data}


async def get_inventory(user_id: UUID) -> list[UserItemResponse]:
    """Return all items owned by the user."""
    records = await execute_query(
        """
        MATCH (u:User {id: $user_id})-[o:OWNS]->(item:ShopItem)
        RETURN item, o.purchased_at AS purchased_at, o.equipped AS equipped
        ORDER BY o.purchased_at DESC
        """,
        {"user_id": str(user_id)},
    )
    results = []
    for r in records:
        item = _node_to_item(r["item"])
        purchased_at = _neo4j_to_python_datetime(r["purchased_at"])
        results.append(
            UserItemResponse(
                item=item,
                purchased_at=purchased_at,
                equipped=bool(r["equipped"]),
            )
        )
    return results


async def equip_item(user_id: UUID, item_id: UUID) -> None:
    """Equip an item. Unequips other items of the same category first."""
    # Unequip same-category items, then equip the target
    await execute_query(
        """
        MATCH (u:User {id: $user_id})-[o:OWNS]->(item:ShopItem {id: $item_id})
        WITH u, item, o
        OPTIONAL MATCH (u)-[other:OWNS]->(same:ShopItem)
        WHERE same.category = item.category AND same.id <> item.id AND other.equipped = true
        SET other.equipped = false
        WITH o
        SET o.equipped = true
        """,
        {"user_id": str(user_id), "item_id": str(item_id)},
    )


async def unequip_item(user_id: UUID, item_id: UUID) -> None:
    """Unequip an item."""
    await execute_query(
        """
        MATCH (u:User {id: $user_id})-[o:OWNS]->(item:ShopItem {id: $item_id})
        SET o.equipped = false
        """,
        {"user_id": str(user_id), "item_id": str(item_id)},
    )


async def get_equipped_items(user_id: UUID) -> list[ShopItemResponse]:
    """Return currently equipped items for a user (for profile display)."""
    records = await execute_query(
        """
        MATCH (u:User {id: $user_id})-[o:OWNS {equipped: true}]->(item:ShopItem)
        RETURN item
        """,
        {"user_id": str(user_id)},
    )
    return [_node_to_item(r["item"]) for r in records]


def _node_to_item(node: dict) -> ShopItemResponse:
    """Map a Neo4j ShopItem node to a response model."""
    props = dict(node)
    return ShopItemResponse(
        id=props["id"],
        short_id=props.get("short_id"),
        name=props["name"],
        description=props.get("description", ""),
        category=props["category"],
        price=props.get("price", 0),
        rarity=props.get("rarity", "common"),
        preview_url=props.get("preview_url"),
        emoji_code=props.get("emoji_code"),
        is_active=props.get("is_active", True),
    )
