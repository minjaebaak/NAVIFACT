"""Discussion service — threads, comments, and votes."""

from uuid import UUID

from app.db.neo4j import execute_query
from app.models.common import PaginatedResponse
from app.models.discussion import (
    CommentAuthor,
    CommentCreate,
    CommentResponse,
    DiscussionResponse,
)
from app.services.event_service import _neo4j_to_python_datetime


async def get_or_create_discussion(
    target_type: str,
    target_id: str,
    title: str | None = None,
) -> DiscussionResponse:
    """Return the discussion for a target, creating one if it doesn't exist."""
    # Try to find existing
    records = await execute_query(
        """
        MATCH (d:Discussion {target_type: $tt, target_id: $tid})
        OPTIONAL MATCH (d)-[:HAS_COMMENT]->(c:Comment)
        RETURN d, count(c) AS cnt
        """,
        {"tt": target_type, "tid": target_id},
    )
    if records and records[0]["d"] is not None:
        return _node_to_discussion(records[0]["d"], records[0]["cnt"])

    # Create
    auto_title = title or f"{target_type} {target_id} 토론"
    records = await execute_query(
        """
        CREATE (d:Discussion {
            id: randomUUID(),
            title: $title,
            target_type: $tt,
            target_id: $tid,
            created_at: datetime(),
            updated_at: datetime()
        })
        RETURN d
        """,
        {"title": auto_title, "tt": target_type, "tid": target_id},
    )
    return _node_to_discussion(records[0]["d"], 0)


async def list_comments(
    discussion_id: UUID,
    page: int = 1,
    page_size: int = 50,
    current_user_id: UUID | None = None,
) -> PaginatedResponse[CommentResponse]:
    """Return top-level comments with nested replies (1 level)."""
    skip = (page - 1) * page_size

    count_records = await execute_query(
        """
        MATCH (d:Discussion {id: $did})-[:HAS_COMMENT]->(c:Comment)
        WHERE c.parent_id IS NULL
        RETURN count(c) AS total
        """,
        {"did": str(discussion_id)},
    )
    total = count_records[0]["total"] if count_records else 0

    # Top-level comments
    records = await execute_query(
        """
        MATCH (d:Discussion {id: $did})-[:HAS_COMMENT]->(c:Comment)
        WHERE c.parent_id IS NULL
        MATCH (u:User)-[:WROTE]->(c)
        RETURN c, u
        ORDER BY c.created_at DESC
        SKIP $skip LIMIT $limit
        """,
        {"did": str(discussion_id), "skip": skip, "limit": page_size},
    )

    # Fetch current user's votes for all comments in this discussion
    user_votes: dict[str, str] = {}
    if current_user_id:
        vote_records = await execute_query(
            """
            MATCH (u:User {id: $uid})-[v:VOTED]->(c:Comment)<-[:HAS_COMMENT]-(d:Discussion {id: $did})
            RETURN c.id AS cid, v.vote_type AS vt
            """,
            {"uid": str(current_user_id), "did": str(discussion_id)},
        )
        for vr in vote_records:
            user_votes[vr["cid"]] = vr["vt"]

    items: list[CommentResponse] = []
    for r in records:
        comment = _node_to_comment(r["c"], r["u"])
        comment.my_vote = user_votes.get(str(comment.id))
        # Fetch replies
        reply_records = await execute_query(
            """
            MATCH (parent:Comment {id: $pid})<-[:REPLY_TO]-(reply:Comment)
            MATCH (u:User)-[:WROTE]->(reply)
            RETURN reply, u
            ORDER BY reply.created_at ASC
            """,
            {"pid": str(comment.id)},
        )
        comment.replies = [
            _set_my_vote(_node_to_comment(rr["reply"], rr["u"]), user_votes)
            for rr in reply_records
        ]
        items.append(comment)

    total_pages = max(1, -(-total // page_size))
    return PaginatedResponse(
        items=items, total=total, page=page, page_size=page_size, total_pages=total_pages
    )


async def create_comment(
    discussion_id: UUID,
    user_id: UUID,
    payload: CommentCreate,
) -> CommentResponse:
    """Create a comment in a discussion."""
    params = {
        "did": str(discussion_id),
        "uid": str(user_id),
        "content": payload.content,
        "parent_id": str(payload.parent_id) if payload.parent_id else None,
    }

    if payload.parent_id:
        query = """
            MATCH (d:Discussion {id: $did})
            MATCH (u:User {id: $uid})
            MATCH (parent:Comment {id: $parent_id})
            CREATE (c:Comment {
                id: randomUUID(),
                content: $content,
                parent_id: $parent_id,
                upvotes: 0,
                downvotes: 0,
                good_perspectives: 0,
                fair_points: 0,
                persuasives: 0,
                created_at: datetime(),
                updated_at: datetime()
            })
            CREATE (d)-[:HAS_COMMENT]->(c)
            CREATE (u)-[:WROTE]->(c)
            CREATE (c)-[:REPLY_TO]->(parent)
            RETURN c, u
        """
    else:
        query = """
            MATCH (d:Discussion {id: $did})
            MATCH (u:User {id: $uid})
            CREATE (c:Comment {
                id: randomUUID(),
                content: $content,
                parent_id: null,
                upvotes: 0,
                downvotes: 0,
                good_perspectives: 0,
                fair_points: 0,
                persuasives: 0,
                created_at: datetime(),
                updated_at: datetime()
            })
            CREATE (d)-[:HAS_COMMENT]->(c)
            CREATE (u)-[:WROTE]->(c)
            RETURN c, u
        """

    records = await execute_query(query, params)
    if not records:
        raise ValueError("Discussion or user not found")

    # Award points for commenting (+5)
    from app.services.point_service import add_points
    from app.services.activity_service import log_activity

    await add_points(user_id, 5, "comment_created", reference_id=None)
    await log_activity(user_id, "comment_created", "댓글 작성")

    return _node_to_comment(records[0]["c"], records[0]["u"])


VOTE_FIELD_MAP = {
    "up": "upvotes",
    "down": "downvotes",
    "good_perspective": "good_perspectives",
    "fair_point": "fair_points",
    "persuasive": "persuasives",
}

VOTE_POINTS_MAP = {
    "up": 2,
    "good_perspective": 3,
    "fair_point": 5,
    "persuasive": 7,
}


async def vote_comment(
    comment_id: UUID,
    user_id: UUID,
    vote_type: str,
) -> dict:
    """Toggle a vote on a comment. Returns updated counts."""
    # Ensure new counter fields exist (backward compat)
    await execute_query(
        """
        MATCH (c:Comment {id: $cid})
        SET c.good_perspectives = coalesce(c.good_perspectives, 0),
            c.fair_points = coalesce(c.fair_points, 0),
            c.persuasives = coalesce(c.persuasives, 0)
        """,
        {"cid": str(comment_id)},
    )

    # Check existing vote
    existing = await execute_query(
        """
        MATCH (u:User {id: $uid})-[v:VOTED]->(c:Comment {id: $cid})
        RETURN v.vote_type AS vt
        """,
        {"uid": str(user_id), "cid": str(comment_id)},
    )

    if existing:
        old_type = existing[0]["vt"]
        if old_type == vote_type:
            # Remove vote (toggle off)
            field = VOTE_FIELD_MAP.get(vote_type, "upvotes")
            await execute_query(
                f"""
                MATCH (u:User {{id: $uid}})-[v:VOTED]->(c:Comment {{id: $cid}})
                SET c.{field} = c.{field} - 1
                DELETE v
                RETURN c
                """,
                {"uid": str(user_id), "cid": str(comment_id)},
            )
        else:
            # Switch vote
            old_field = VOTE_FIELD_MAP.get(old_type, "upvotes")
            new_field = VOTE_FIELD_MAP.get(vote_type, "upvotes")
            await execute_query(
                f"""
                MATCH (u:User {{id: $uid}})-[v:VOTED]->(c:Comment {{id: $cid}})
                SET v.vote_type = $vt,
                    c.{old_field} = c.{old_field} - 1,
                    c.{new_field} = c.{new_field} + 1
                RETURN c
                """,
                {"uid": str(user_id), "cid": str(comment_id), "vt": vote_type},
            )
    else:
        # New vote
        field = VOTE_FIELD_MAP.get(vote_type, "upvotes")
        await execute_query(
            f"""
            MATCH (u:User {{id: $uid}}), (c:Comment {{id: $cid}})
            CREATE (u)-[:VOTED {{vote_type: $vt}}]->(c)
            SET c.{field} = c.{field} + 1
            RETURN c
            """,
            {"uid": str(user_id), "cid": str(comment_id), "vt": vote_type},
        )

        # Award points to comment author (varies by reaction type)
        points = VOTE_POINTS_MAP.get(vote_type, 0)
        if points > 0:
            author_records = await execute_query(
                "MATCH (u:User)-[:WROTE]->(c:Comment {id: $cid}) RETURN u.id AS author_id",
                {"cid": str(comment_id)},
            )
            if author_records and author_records[0]["author_id"] != str(user_id):
                from app.services.point_service import add_points
                await add_points(
                    UUID(author_records[0]["author_id"]), points, f"vote_received_{vote_type}"
                )

    # Evaluate debate title for the comment author
    if vote_type in ("good_perspective", "fair_point", "persuasive"):
        author_for_title = await execute_query(
            "MATCH (u:User)-[:WROTE]->(c:Comment {id: $cid}) RETURN u.id AS author_id",
            {"cid": str(comment_id)},
        )
        if author_for_title:
            from app.services.title_service import evaluate_debate_title
            await evaluate_debate_title(UUID(author_for_title[0]["author_id"]))

    # Return updated counts
    result = await execute_query(
        """MATCH (c:Comment {id: $cid})
        RETURN c.upvotes AS up, c.downvotes AS down,
               coalesce(c.good_perspectives, 0) AS gp,
               coalesce(c.fair_points, 0) AS fp,
               coalesce(c.persuasives, 0) AS ps""",
        {"cid": str(comment_id)},
    )
    return {
        "upvotes": result[0]["up"],
        "downvotes": result[0]["down"],
        "good_perspectives": result[0]["gp"],
        "fair_points": result[0]["fp"],
        "persuasives": result[0]["ps"],
    }


async def delete_comment(comment_id: UUID, user_id: UUID, is_admin: bool = False) -> bool:
    """Delete a comment (only by author or admin)."""
    if is_admin:
        records = await execute_query(
            "MATCH (c:Comment {id: $cid}) DETACH DELETE c RETURN true AS ok",
            {"cid": str(comment_id)},
        )
    else:
        records = await execute_query(
            """
            MATCH (u:User {id: $uid})-[:WROTE]->(c:Comment {id: $cid})
            DETACH DELETE c
            RETURN true AS ok
            """,
            {"uid": str(user_id), "cid": str(comment_id)},
        )
    return bool(records)


def _node_to_discussion(node: dict, comment_count: int = 0) -> DiscussionResponse:
    props = dict(node)
    return DiscussionResponse(
        id=props["id"],
        title=props["title"],
        target_type=props["target_type"],
        target_id=props["target_id"],
        comment_count=comment_count,
        created_at=_neo4j_to_python_datetime(props["created_at"]),
    )


def _node_to_comment(node: dict, user_node: dict) -> CommentResponse:
    props = dict(node)
    u = dict(user_node)
    return CommentResponse(
        id=props["id"],
        content=props["content"],
        author=CommentAuthor(
            id=u["id"],
            username=u["username"],
            active_title=u.get("active_title"),
        ),
        parent_id=props.get("parent_id"),
        upvotes=props.get("upvotes", 0),
        downvotes=props.get("downvotes", 0),
        good_perspectives=props.get("good_perspectives", 0),
        fair_points=props.get("fair_points", 0),
        persuasives=props.get("persuasives", 0),
        created_at=_neo4j_to_python_datetime(props["created_at"]),
    )


def _set_my_vote(comment: CommentResponse, user_votes: dict[str, str]) -> CommentResponse:
    comment.my_vote = user_votes.get(str(comment.id))
    return comment
