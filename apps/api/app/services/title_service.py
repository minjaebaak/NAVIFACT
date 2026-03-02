"""Title service — evaluate, grant, and manage user titles."""

from uuid import UUID

from app.db.neo4j import execute_query
from app.models.title import TitleResponse, UserTitleResponse


async def get_all_titles() -> list[TitleResponse]:
    """Return all defined titles ordered by category then tier."""
    records = await execute_query(
        "MATCH (t:Title) RETURN t ORDER BY t.category, t.tier"
    )
    return [_node_to_title(r["t"]) for r in records]


async def get_user_titles(user_id: UUID) -> list[UserTitleResponse]:
    """Return all titles earned by a user."""
    query = """
        MATCH (u:User {id: $user_id})-[r:HAS_TITLE]->(t:Title)
        RETURN t, r.earned_at AS earned_at, r.is_active AS is_active
        ORDER BY t.category, t.tier DESC
    """
    records = await execute_query(query, {"user_id": str(user_id)})
    from app.services.event_service import _neo4j_to_python_datetime

    results = []
    for r in records:
        title = _node_to_title(r["t"])
        results.append(
            UserTitleResponse(
                title=title,
                earned_at=_neo4j_to_python_datetime(r["earned_at"]),
                is_active=r.get("is_active", False),
            )
        )
    return results


async def set_active_title(user_id: UUID, title_id: UUID) -> bool:
    """Set a title as the user's display title. Returns True on success."""
    # Verify user owns this title
    check = await execute_query(
        "MATCH (u:User {id: $uid})-[:HAS_TITLE]->(t:Title {id: $tid}) RETURN t",
        {"uid": str(user_id), "tid": str(title_id)},
    )
    if not check:
        return False

    # Clear all active flags, then set the chosen one
    await execute_query(
        """
        MATCH (u:User {id: $uid})-[r:HAS_TITLE]->(:Title)
        SET r.is_active = false
        """,
        {"uid": str(user_id)},
    )
    await execute_query(
        """
        MATCH (u:User {id: $uid})-[r:HAS_TITLE]->(t:Title {id: $tid})
        SET r.is_active = true
        SET u.active_title = t.name
        """,
        {"uid": str(user_id), "tid": str(title_id)},
    )
    return True


async def evaluate_prediction_title(user_id: UUID) -> None:
    """Re-evaluate prediction titles based on accuracy rate.

    Called after market resolution updates user stats.
    """
    # Get user stats
    user_records = await execute_query(
        "MATCH (u:User {id: $uid}) RETURN u.total_bets AS total, u.correct_bets AS correct",
        {"uid": str(user_id)},
    )
    if not user_records:
        return
    total = user_records[0].get("total", 0) or 0
    correct = user_records[0].get("correct", 0) or 0
    if total == 0:
        return

    accuracy = correct / total

    # Get all prediction titles ordered by tier desc (highest first)
    title_records = await execute_query(
        """
        MATCH (t:Title {category: 'prediction'})
        RETURN t ORDER BY t.tier DESC
        """
    )

    best_title_id = None
    for r in title_records:
        t = dict(r["t"])
        min_bets = t.get("min_bets", 0) or 0
        min_acc = t.get("min_accuracy", 0.0) or 0.0
        if total >= min_bets and accuracy >= min_acc:
            best_title_id = t["id"]
            break

    if not best_title_id:
        return

    # Grant if not already owned
    existing = await execute_query(
        "MATCH (u:User {id: $uid})-[:HAS_TITLE]->(t:Title {id: $tid}) RETURN t",
        {"uid": str(user_id), "tid": str(best_title_id)},
    )
    if not existing:
        # Remove old prediction titles, grant new
        await execute_query(
            """
            MATCH (u:User {id: $uid})-[r:HAS_TITLE]->(t:Title {category: 'prediction'})
            DELETE r
            """,
            {"uid": str(user_id)},
        )
        await execute_query(
            """
            MATCH (u:User {id: $uid}), (t:Title {id: $tid})
            CREATE (u)-[:HAS_TITLE {earned_at: datetime(), is_active: false}]->(t)
            """,
            {"uid": str(user_id), "tid": str(best_title_id)},
        )


async def evaluate_activity_title(user_id: UUID) -> None:
    """Re-evaluate activity titles based on comment count and upvotes received."""
    stats = await execute_query(
        """
        MATCH (u:User {id: $uid})
        OPTIONAL MATCH (u)-[:WROTE]->(c:Comment)
        WITH u, count(c) AS comment_count
        OPTIONAL MATCH (u)-[:WROTE]->(c2:Comment)
        WITH u, comment_count, COALESCE(sum(c2.upvotes), 0) AS total_upvotes
        RETURN comment_count, total_upvotes
        """,
        {"uid": str(user_id)},
    )
    if not stats:
        return

    comment_count = stats[0].get("comment_count", 0) or 0
    total_upvotes = stats[0].get("total_upvotes", 0) or 0

    # Get activity titles ordered by tier desc
    title_records = await execute_query(
        "MATCH (t:Title {category: 'activity'}) RETURN t ORDER BY t.tier DESC"
    )

    best_title_id = None
    for r in title_records:
        t = dict(r["t"])
        min_comments = t.get("min_comments", 0) or 0
        min_upvotes = t.get("min_upvotes_received", 0) or 0
        if comment_count >= min_comments and total_upvotes >= min_upvotes:
            best_title_id = t["id"]
            break

    if not best_title_id:
        return

    existing = await execute_query(
        "MATCH (u:User {id: $uid})-[:HAS_TITLE]->(t:Title {id: $tid}) RETURN t",
        {"uid": str(user_id), "tid": str(best_title_id)},
    )
    if not existing:
        await execute_query(
            """
            MATCH (u:User {id: $uid})-[r:HAS_TITLE]->(t:Title {category: 'activity'})
            DELETE r
            """,
            {"uid": str(user_id)},
        )
        await execute_query(
            """
            MATCH (u:User {id: $uid}), (t:Title {id: $tid})
            CREATE (u)-[:HAS_TITLE {earned_at: datetime(), is_active: false}]->(t)
            """,
            {"uid": str(user_id), "tid": str(best_title_id)},
        )


async def evaluate_debate_title(user_id: UUID) -> None:
    """Re-evaluate debate titles based on reactions received on user's comments."""
    stats = await execute_query(
        """
        MATCH (u:User {id: $uid})-[:WROTE]->(c:Comment)
        RETURN
            COALESCE(sum(c.good_perspectives), 0) AS total_gp,
            COALESCE(sum(c.fair_points), 0) AS total_fp,
            COALESCE(sum(c.persuasives), 0) AS total_ps
        """,
        {"uid": str(user_id)},
    )
    if not stats:
        return

    total_gp = stats[0].get("total_gp", 0) or 0
    total_fp = stats[0].get("total_fp", 0) or 0
    total_ps = stats[0].get("total_ps", 0) or 0

    # Get debate titles ordered by tier desc
    title_records = await execute_query(
        "MATCH (t:Title {category: 'debate'}) RETURN t ORDER BY t.tier DESC"
    )

    best_title_id = None
    for r in title_records:
        t = dict(r["t"])
        min_gp = t.get("min_good_perspectives", 0) or 0
        min_fp = t.get("min_fair_points", 0) or 0
        min_ps = t.get("min_persuasives", 0) or 0
        # Check if user meets ALL non-zero requirements
        meets = True
        if min_gp > 0 and total_gp < min_gp:
            meets = False
        if min_fp > 0 and total_fp < min_fp:
            meets = False
        if min_ps > 0 and total_ps < min_ps:
            meets = False
        # Tier 0 has no requirements (baseline)
        if meets:
            best_title_id = t["id"]
            break

    if not best_title_id:
        return

    existing = await execute_query(
        "MATCH (u:User {id: $uid})-[:HAS_TITLE]->(t:Title {id: $tid}) RETURN t",
        {"uid": str(user_id), "tid": str(best_title_id)},
    )
    if not existing:
        await execute_query(
            """
            MATCH (u:User {id: $uid})-[r:HAS_TITLE]->(t:Title {category: 'debate'})
            DELETE r
            """,
            {"uid": str(user_id)},
        )
        await execute_query(
            """
            MATCH (u:User {id: $uid}), (t:Title {id: $tid})
            CREATE (u)-[:HAS_TITLE {earned_at: datetime(), is_active: false}]->(t)
            """,
            {"uid": str(user_id), "tid": str(best_title_id)},
        )


def _node_to_title(node: dict) -> TitleResponse:
    props = dict(node)
    return TitleResponse(
        id=props["id"],
        name=props["name"],
        description=props["description"],
        category=props["category"],
        tier=props["tier"],
        icon=props["icon"],
        min_accuracy=props.get("min_accuracy"),
        min_bets=props.get("min_bets"),
        min_comments=props.get("min_comments"),
        min_upvotes_received=props.get("min_upvotes_received"),
        min_good_perspectives=props.get("min_good_perspectives"),
        min_fair_points=props.get("min_fair_points"),
        min_persuasives=props.get("min_persuasives"),
    )
