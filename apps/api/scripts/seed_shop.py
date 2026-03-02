"""Seed shop items into Neo4j."""

import json
import uuid
from pathlib import Path

from app.db.neo4j import execute_query, init_driver, close_driver

NAMESPACE = uuid.UUID("a1b2c3d4-e5f6-7890-abcd-ef1234567890")
SEED_DIR = Path(__file__).resolve().parent.parent.parent.parent / "web" / "data" / "seed"


def short_to_uuid(short_id: str) -> str:
    return str(uuid.uuid5(NAMESPACE, short_id))


async def seed_shop_items() -> int:
    """Create ShopItem nodes from shop-items.json. Returns count."""
    path = SEED_DIR / "shop-items.json"
    if not path.exists():
        print(f"  ⚠️  {path} not found, skipping shop seed.")
        return 0

    items = json.loads(path.read_text(encoding="utf-8"))
    count = 0

    for item in items:
        uid = short_to_uuid(item["id"])
        await execute_query(
            """
            MERGE (i:ShopItem {id: $id})
            SET i.short_id = $short_id,
                i.name = $name,
                i.description = $description,
                i.category = $category,
                i.price = $price,
                i.rarity = $rarity,
                i.preview_url = $preview_url,
                i.emoji_code = $emoji_code,
                i.is_active = true,
                i.created_at = datetime()
            """,
            {
                "id": uid,
                "short_id": item["id"],
                "name": item["name"],
                "description": item.get("description", ""),
                "category": item["category"],
                "price": item["price"],
                "rarity": item.get("rarity", "common"),
                "preview_url": item.get("preview_url"),
                "emoji_code": item.get("emoji_code"),
            },
        )
        count += 1

    return count


async def main():
    await init_driver()
    count = await seed_shop_items()
    print(f"✅ Seeded {count} shop items.")
    await close_driver()


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
