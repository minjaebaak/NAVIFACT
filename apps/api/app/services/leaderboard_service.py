"""Leaderboard service — ranked user lists."""

from app.db.neo4j import execute_query
from app.models.common import PaginatedResponse
from app.models.leaderboard import LeaderboardEntry


async def get_leaderboard(
    board_type: str = "accuracy",
    page: int = 1,
    page_size: int = 20,
) -> PaginatedResponse[LeaderboardEntry]:
    """Return ranked users based on type: accuracy, points, or activity."""
    skip = (page - 1) * page_size

    if board_type == "accuracy":
        order_field = "u.accuracy_rate"
        where = "WHERE u.total_bets >= 5"
    elif board_type == "points":
        order_field = "u.points"
        where = ""
    else:  # activity
        order_field = "comment_count"
        return await _activity_leaderboard(page, page_size, skip)

    count_query = f"MATCH (u:User) {where} RETURN count(u) AS total"
    count_records = await execute_query(count_query)
    total = count_records[0]["total"] if count_records else 0

    data_query = f"""
        MATCH (u:User)
        {where}
        RETURN u
        ORDER BY {order_field} DESC
        SKIP $skip LIMIT $limit
    """
    records = await execute_query(data_query, {"skip": skip, "limit": page_size})

    items = []
    for idx, r in enumerate(records):
        props = dict(r["u"])
        if board_type == "accuracy":
            score = props.get("accuracy_rate", 0.0) or 0.0
        else:
            score = float(props.get("points", 0) or 0)

        items.append(LeaderboardEntry(
            rank=skip + idx + 1,
            user_id=props["id"],
            username=props["username"],
            active_title=props.get("active_title"),
            score=score,
            total_bets=props.get("total_bets", 0) or 0,
            correct_bets=props.get("correct_bets", 0) or 0,
            points=props.get("points", 0) or 0,
        ))

    total_pages = max(1, -(-total // page_size))
    return PaginatedResponse(
        items=items, total=total, page=page, page_size=page_size, total_pages=total_pages
    )


async def _activity_leaderboard(
    page: int, page_size: int, skip: int
) -> PaginatedResponse[LeaderboardEntry]:
    count_records = await execute_query(
        """
        MATCH (u:User)
        OPTIONAL MATCH (u)-[:WROTE]->(c:Comment)
        WITH u, count(c) AS cc
        WHERE cc > 0
        RETURN count(u) AS total
        """
    )
    total = count_records[0]["total"] if count_records else 0

    records = await execute_query(
        """
        MATCH (u:User)
        OPTIONAL MATCH (u)-[:WROTE]->(c:Comment)
        WITH u, count(c) AS comment_count
        WHERE comment_count > 0
        RETURN u, comment_count
        ORDER BY comment_count DESC
        SKIP $skip LIMIT $limit
        """,
        {"skip": skip, "limit": page_size},
    )

    items = []
    for idx, r in enumerate(records):
        props = dict(r["u"])
        items.append(LeaderboardEntry(
            rank=skip + idx + 1,
            user_id=props["id"],
            username=props["username"],
            active_title=props.get("active_title"),
            score=float(r["comment_count"]),
            total_bets=props.get("total_bets", 0) or 0,
            correct_bets=props.get("correct_bets", 0) or 0,
            points=props.get("points", 0) or 0,
        ))

    total_pages = max(1, -(-total // page_size))
    return PaginatedResponse(
        items=items, total=total, page=page, page_size=page_size, total_pages=total_pages
    )
