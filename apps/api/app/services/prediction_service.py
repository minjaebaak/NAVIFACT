"""Prediction market service — markets, bets, and point transactions."""

from uuid import UUID

from app.db.neo4j import execute_query
from app.models.common import PaginatedResponse
from app.models.prediction import (
    BetCreate,
    BetResponse,
    MarketStatus,
    PredictionMarketResponse,
)
from app.services.event_service import _neo4j_to_python_datetime


async def list_active_markets(
    page: int = 1,
    page_size: int = 20,
) -> PaginatedResponse[PredictionMarketResponse]:
    """Return paginated active (open) prediction markets."""
    skip = (page - 1) * page_size

    count_query = "MATCH (m:PredictionMarket {status: 'open'}) RETURN count(m) AS total"
    data_query = """
        MATCH (m:PredictionMarket {status: 'open'})
        ORDER BY m.closes_at ASC
        SKIP $skip
        LIMIT $limit
        RETURN m
    """

    count_records = await execute_query(count_query)
    total = count_records[0]["total"] if count_records else 0

    records = await execute_query(data_query, {"skip": skip, "limit": page_size})
    items = [_node_to_market(r["m"]) for r in records]

    total_pages = max(1, -(-total // page_size))
    return PaginatedResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


async def get_market(market_id: UUID) -> PredictionMarketResponse | None:
    """Fetch a single prediction market."""
    records = await execute_query(
        "MATCH (m:PredictionMarket {id: $id}) RETURN m",
        {"id": str(market_id)},
    )
    if not records:
        return None
    return _node_to_market(records[0]["m"])


async def place_bet(
    market_id: UUID,
    user_id: UUID,
    payload: BetCreate,
) -> BetResponse:
    """Place a bet on a prediction market.

    Atomically: check balance, deduct points, create bet, update pool.
    """
    query = """
        MATCH (u:User {id: $user_id})
        MATCH (m:PredictionMarket {id: $market_id})
        WHERE m.status = 'open' AND u.points >= $amount
        SET u.points = u.points - $amount
        WITH u, m
        CREATE (b:Bet {
            id: randomUUID(),
            market_id: $market_id,
            user_id: $user_id,
            side: $side,
            amount: $amount,
            placed_at: datetime()
        })
        CREATE (m)-[:HAS_BET]->(b)
        CREATE (t:PointTransaction {
            id: randomUUID(),
            user_id: $user_id,
            amount: -$amount,
            reason: 'bet_placed',
            reference_id: b.id,
            balance_after: u.points,
            created_at: datetime()
        })
        CREATE (u)-[:HAS_TRANSACTION]->(t)
        SET m.total_pool = m.total_pool + $amount,
            m.updated_at = datetime()
        RETURN b
    """
    records = await execute_query(
        query,
        {
            "market_id": str(market_id),
            "user_id": str(user_id),
            "side": payload.side.value,
            "amount": payload.amount,
        },
    )

    if not records:
        raise ValueError("Market not found, not open, or insufficient points")

    b_props = dict(records[0]["b"])
    return BetResponse(
        id=b_props["id"],
        market_id=b_props["market_id"],
        user_id=b_props["user_id"],
        side=b_props["side"],
        amount=b_props["amount"],
        placed_at=_neo4j_to_python_datetime(b_props["placed_at"]),
    )


async def resolve_market(market_id: UUID, outcome: str) -> PredictionMarketResponse:
    """Resolve a market and distribute winnings.

    outcome: "yes" or "no"
    """
    if outcome not in ("yes", "no"):
        raise ValueError("outcome must be 'yes' or 'no'")

    new_status = f"resolved_{outcome}"

    # 1. Update market status
    mkt_records = await execute_query(
        """
        MATCH (m:PredictionMarket {id: $mid})
        WHERE m.status = 'open' OR m.status = 'closed'
        SET m.status = $status, m.resolved_at = datetime(), m.updated_at = datetime()
        RETURN m
        """,
        {"mid": str(market_id), "status": new_status},
    )
    if not mkt_records:
        raise ValueError("Market not found or already resolved")

    total_pool = mkt_records[0]["m"].get("total_pool", 0) or 0

    # 2. Get winning side total
    winning_records = await execute_query(
        """
        MATCH (m:PredictionMarket {id: $mid})-[:HAS_BET]->(b:Bet)
        WHERE b.side = $side
        RETURN sum(b.amount) AS winning_pool
        """,
        {"mid": str(market_id), "side": outcome},
    )
    winning_pool = winning_records[0]["winning_pool"] if winning_records and winning_records[0]["winning_pool"] else 0

    # 3. Distribute winnings proportionally
    if winning_pool > 0 and total_pool > 0:
        winners = await execute_query(
            """
            MATCH (m:PredictionMarket {id: $mid})-[:HAS_BET]->(b:Bet)
            WHERE b.side = $side
            RETURN b.user_id AS uid, b.amount AS amt
            """,
            {"mid": str(market_id), "side": outcome},
        )
        for w in winners:
            payout = int(w["amt"] / winning_pool * total_pool)
            uid = w["uid"]
            await execute_query(
                """
                MATCH (u:User {id: $uid})
                SET u.points = u.points + $payout,
                    u.total_bets = COALESCE(u.total_bets, 0) + 1,
                    u.correct_bets = COALESCE(u.correct_bets, 0) + 1,
                    u.accuracy_rate = toFloat(COALESCE(u.correct_bets, 0) + 1) / toFloat(COALESCE(u.total_bets, 0) + 1)
                WITH u
                CREATE (t:PointTransaction {
                    id: randomUUID(),
                    user_id: $uid,
                    amount: $payout,
                    reason: 'bet_won',
                    reference_id: $mid,
                    balance_after: u.points,
                    created_at: datetime()
                })
                CREATE (u)-[:HAS_TRANSACTION]->(t)
                """,
                {"uid": uid, "payout": payout, "mid": str(market_id)},
            )
            # Evaluate prediction title
            from app.services.title_service import evaluate_prediction_title
            await evaluate_prediction_title(UUID(uid))

    # 4. Update losers' stats
    losing_side = "no" if outcome == "yes" else "yes"
    losers = await execute_query(
        """
        MATCH (m:PredictionMarket {id: $mid})-[:HAS_BET]->(b:Bet)
        WHERE b.side = $side
        RETURN DISTINCT b.user_id AS uid
        """,
        {"mid": str(market_id), "side": losing_side},
    )
    for l in losers:
        uid = l["uid"]
        await execute_query(
            """
            MATCH (u:User {id: $uid})
            SET u.total_bets = COALESCE(u.total_bets, 0) + 1,
                u.accuracy_rate = toFloat(COALESCE(u.correct_bets, 0)) / toFloat(COALESCE(u.total_bets, 0) + 1)
            """,
            {"uid": uid},
        )
        from app.services.title_service import evaluate_prediction_title
        await evaluate_prediction_title(UUID(uid))

    return _node_to_market(mkt_records[0]["m"])


def _node_to_market(node: dict) -> PredictionMarketResponse:
    props = dict(node)
    return PredictionMarketResponse(
        id=props["id"],
        question=props["question"],
        description=props["description"],
        event_id=props.get("event_id"),
        status=props.get("status", MarketStatus.OPEN),
        yes_probability=props.get("yes_probability", 0.5),
        total_pool=props.get("total_pool", 0),
        closes_at=_neo4j_to_python_datetime(props["closes_at"]),
        resolved_at=_neo4j_to_python_datetime(props.get("resolved_at")),
        created_at=_neo4j_to_python_datetime(props["created_at"]),
        updated_at=_neo4j_to_python_datetime(props["updated_at"]),
    )
