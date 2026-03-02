"""Seed Title nodes into Neo4j.

Usage:
    cd apps/api && python -m scripts.seed_titles
"""

import asyncio
from uuid import uuid5, UUID

from app.db.neo4j import execute_query

NAMESPACE = UUID("a1b2c3d4-e5f6-7890-abcd-ef1234567890")

PREDICTION_TITLES = [
    {"tier": 0, "name": "진실을 외면한 자", "icon": "\U0001F648", "desc": "예측 적중률 0~19%", "min_accuracy": 0.0, "min_bets": 10},
    {"tier": 1, "name": "미혹된 자", "icon": "\U0001F635\u200D\U0001F4AB", "desc": "예측 적중률 20~29%", "min_accuracy": 0.20, "min_bets": 10},
    {"tier": 2, "name": "방황하는 자", "icon": "\U0001F6B6", "desc": "예측 적중률 30~39%", "min_accuracy": 0.30, "min_bets": 10},
    {"tier": 3, "name": "의심하는 자", "icon": "\U0001F914", "desc": "예측 적중률 40~49%", "min_accuracy": 0.40, "min_bets": 10},
    {"tier": 4, "name": "탐구하는 자", "icon": "\U0001F50D", "desc": "예측 적중률 50~59%", "min_accuracy": 0.50, "min_bets": 15},
    {"tier": 5, "name": "깨달은 자", "icon": "\U0001F4A1", "desc": "예측 적중률 60~69%", "min_accuracy": 0.60, "min_bets": 15},
    {"tier": 6, "name": "통찰하는 자", "icon": "\U0001F52E", "desc": "예측 적중률 70~79%", "min_accuracy": 0.70, "min_bets": 20},
    {"tier": 7, "name": "선견지명의 자", "icon": "\U0001F985", "desc": "예측 적중률 80~89%", "min_accuracy": 0.80, "min_bets": 20},
    {"tier": 8, "name": "진실의 수호자", "icon": "\U0001F6E1\uFE0F", "desc": "예측 적중률 90~95%", "min_accuracy": 0.90, "min_bets": 25},
    {"tier": 9, "name": "역사의 눈", "icon": "\U0001F441\uFE0F", "desc": "예측 적중률 96~100%", "min_accuracy": 0.96, "min_bets": 30},
]

ACTIVITY_TITLES = [
    {"tier": 0, "name": "관찰자", "icon": "\U0001F440", "desc": "가입 시 기본 칭호", "min_comments": 0, "min_upvotes": 0},
    {"tier": 1, "name": "참여자", "icon": "\U0000270B", "desc": "댓글 5개 이상 작성", "min_comments": 5, "min_upvotes": 0},
    {"tier": 2, "name": "토론가", "icon": "\U0001F4AC", "desc": "댓글 20개 이상 작성", "min_comments": 20, "min_upvotes": 0},
    {"tier": 3, "name": "논객", "icon": "\U0001F3AF", "desc": "댓글 50개 + 좋아요 100개 받음", "min_comments": 50, "min_upvotes": 100},
    {"tier": 4, "name": "여론 형성자", "icon": "\U0001F4E2", "desc": "댓글 100개 + 좋아요 500개 받음", "min_comments": 100, "min_upvotes": 500},
]


async def seed():
    # Clear existing titles
    await execute_query("MATCH (t:Title) DETACH DELETE t")

    for t in PREDICTION_TITLES:
        tid = str(uuid5(NAMESPACE, f"title-pred-{t['tier']}"))
        await execute_query(
            """
            CREATE (t:Title {
                id: $id,
                name: $name,
                description: $desc,
                category: 'prediction',
                tier: $tier,
                icon: $icon,
                min_accuracy: $min_accuracy,
                min_bets: $min_bets,
                created_at: datetime()
            })
            """,
            {
                "id": tid,
                "name": t["name"],
                "desc": t["desc"],
                "tier": t["tier"],
                "icon": t["icon"],
                "min_accuracy": t["min_accuracy"],
                "min_bets": t["min_bets"],
            },
        )

    for t in ACTIVITY_TITLES:
        tid = str(uuid5(NAMESPACE, f"title-act-{t['tier']}"))
        await execute_query(
            """
            CREATE (t:Title {
                id: $id,
                name: $name,
                description: $desc,
                category: 'activity',
                tier: $tier,
                icon: $icon,
                min_comments: $min_comments,
                min_upvotes_received: $min_upvotes,
                created_at: datetime()
            })
            """,
            {
                "id": tid,
                "name": t["name"],
                "desc": t["desc"],
                "tier": t["tier"],
                "icon": t["icon"],
                "min_comments": t["min_comments"],
                "min_upvotes": t["min_upvotes"],
            },
        )

    print(f"Seeded {len(PREDICTION_TITLES)} prediction titles + {len(ACTIVITY_TITLES)} activity titles")


if __name__ == "__main__":
    asyncio.run(seed())
