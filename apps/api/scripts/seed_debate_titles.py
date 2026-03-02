"""Seed Debate Title nodes into Neo4j.

Usage:
    cd apps/api && python -m scripts.seed_debate_titles
"""

import asyncio
from uuid import uuid5, UUID

from app.db.neo4j import execute_query

NAMESPACE = UUID("a1b2c3d4-e5f6-7890-abcd-ef1234567890")

DEBATE_TITLES = [
    {
        "tier": 0,
        "name": "청중",
        "icon": "\U0001FA91",  # 🪑
        "desc": "가입 시 기본 토론 칭호",
        "min_good_perspectives": 0,
        "min_fair_points": 0,
        "min_persuasives": 0,
    },
    {
        "tier": 1,
        "name": "발언자",
        "icon": "\U0001F3A4",  # 🎤
        "desc": "'좋은 관점' 5개 이상 받음",
        "min_good_perspectives": 5,
        "min_fair_points": 0,
        "min_persuasives": 0,
    },
    {
        "tier": 2,
        "name": "논객",
        "icon": "\u2694\uFE0F",  # ⚔️
        "desc": "'좋은 관점' 20개+ 또는 '공정한 지적' 5개+ 받음",
        "min_good_perspectives": 5,
        "min_fair_points": 5,
        "min_persuasives": 0,
    },
    {
        "tier": 3,
        "name": "설득의 달인",
        "icon": "\U0001F3C6",  # 🏆
        "desc": "'설득력 있음' 10개+ 또는 '공정한 지적' 20개+ 받음",
        "min_good_perspectives": 10,
        "min_fair_points": 10,
        "min_persuasives": 10,
    },
    {
        "tier": 4,
        "name": "양심의 소리",
        "icon": "\u2696\uFE0F",  # ⚖️
        "desc": "'공정한 지적' 50개+ AND '설득력 있음' 20개+ 받음",
        "min_good_perspectives": 30,
        "min_fair_points": 50,
        "min_persuasives": 20,
    },
]


async def seed() -> None:
    for t in DEBATE_TITLES:
        title_id = str(uuid5(NAMESPACE, f"debate-{t['tier']}"))
        await execute_query(
            """
            MERGE (t:Title {id: $id})
            SET t.name = $name,
                t.description = $desc,
                t.category = 'debate',
                t.tier = $tier,
                t.icon = $icon,
                t.min_good_perspectives = $min_gp,
                t.min_fair_points = $min_fp,
                t.min_persuasives = $min_ps
            """,
            {
                "id": title_id,
                "name": t["name"],
                "desc": t["desc"],
                "tier": t["tier"],
                "icon": t["icon"],
                "min_gp": t["min_good_perspectives"],
                "min_fp": t["min_fair_points"],
                "min_ps": t["min_persuasives"],
            },
        )
        print(f"  [debate] tier {t['tier']}: {t['icon']} {t['name']}")

    print(f"\nSeeded {len(DEBATE_TITLES)} debate titles.")


if __name__ == "__main__":
    asyncio.run(seed())
