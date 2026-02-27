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

    Updates the market pool and yes_probability accordingly.
    """
    query = """
        MATCH (m:PredictionMarket {id: $market_id})
        WHERE m.status = 'open'
        CREATE (b:Bet {
            id: randomUUID(),
            market_id: $market_id,
            user_id: $user_id,
            side: $side,
            amount: $amount,
            placed_at: datetime()
        })
        CREATE (m)-[:HAS_BET]->(b)
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
        raise ValueError("Market not found or not open")

    b_props = dict(records[0]["b"])
    return BetResponse(
        id=b_props["id"],
        market_id=b_props["market_id"],
        user_id=b_props["user_id"],
        side=b_props["side"],
        amount=b_props["amount"],
        placed_at=b_props["placed_at"],
    )


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
        closes_at=props["closes_at"],
        resolved_at=props.get("resolved_at"),
        created_at=props["created_at"],
        updated_at=props["updated_at"],
    )
