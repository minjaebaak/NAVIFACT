"""Point service — manage user points and transaction history."""

from uuid import UUID

from app.db.neo4j import execute_query
from app.models.common import PaginatedResponse
from app.models.prediction import PointTransaction


async def add_points(
    user_id: UUID,
    amount: int,
    reason: str,
    reference_id: UUID | None = None,
) -> int:
    """Add (or subtract) points and record a PointTransaction.

    Returns the new balance.
    """
    query = """
        MATCH (u:User {id: $user_id})
        SET u.points = u.points + $amount
        WITH u
        CREATE (t:PointTransaction {
            id: randomUUID(),
            user_id: $user_id,
            amount: $amount,
            reason: $reason,
            reference_id: $reference_id,
            balance_after: u.points,
            created_at: datetime()
        })
        CREATE (u)-[:HAS_TRANSACTION]->(t)
        RETURN u.points AS balance
    """
    records = await execute_query(
        query,
        {
            "user_id": str(user_id),
            "amount": amount,
            "reason": reason,
            "reference_id": str(reference_id) if reference_id else None,
        },
    )
    if not records:
        raise ValueError("User not found")
    return records[0]["balance"]


async def get_balance(user_id: UUID) -> int:
    """Return the current point balance for a user."""
    records = await execute_query(
        "MATCH (u:User {id: $user_id}) RETURN u.points AS balance",
        {"user_id": str(user_id)},
    )
    if not records:
        raise ValueError("User not found")
    return records[0]["balance"]


async def get_transactions(
    user_id: UUID,
    page: int = 1,
    page_size: int = 20,
) -> PaginatedResponse[PointTransaction]:
    """Return paginated point transaction history for a user."""
    skip = (page - 1) * page_size

    count_query = """
        MATCH (u:User {id: $user_id})-[:HAS_TRANSACTION]->(t:PointTransaction)
        RETURN count(t) AS total
    """
    data_query = """
        MATCH (u:User {id: $user_id})-[:HAS_TRANSACTION]->(t:PointTransaction)
        RETURN t
        ORDER BY t.created_at DESC
        SKIP $skip LIMIT $limit
    """

    params = {"user_id": str(user_id), "skip": skip, "limit": page_size}
    count_records = await execute_query(count_query, {"user_id": str(user_id)})
    total = count_records[0]["total"] if count_records else 0

    records = await execute_query(data_query, params)
    items = [_node_to_transaction(r["t"]) for r in records]

    total_pages = max(1, -(-total // page_size))
    return PaginatedResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


def _node_to_transaction(node: dict) -> PointTransaction:
    from app.services.event_service import _neo4j_to_python_datetime

    props = dict(node)
    return PointTransaction(
        id=props["id"],
        user_id=props["user_id"],
        amount=props["amount"],
        reason=props["reason"],
        reference_id=props.get("reference_id"),
        balance_after=props.get("balance_after"),
        created_at=_neo4j_to_python_datetime(props["created_at"]),
    )
