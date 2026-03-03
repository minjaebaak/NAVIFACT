"""Market impact service — queries market impact analysis data from Neo4j."""

import json
from datetime import datetime, timezone

from app.db.neo4j import execute_query
from app.models.common import PaginatedResponse
from app.models.market_impact import (
    MarketImpactResponse,
    SectorImpactResponse,
    StockImpactResponse,
)


def _node_to_market_impact(node: dict) -> MarketImpactResponse:
    props = dict(node)

    sectors: list[SectorImpactResponse] = []
    raw_sectors = props.get("sectors_json")
    if raw_sectors:
        try:
            parsed = json.loads(raw_sectors) if isinstance(raw_sectors, str) else raw_sectors
            for s in parsed:
                stocks = [
                    StockImpactResponse(
                        ticker=st.get("ticker", ""),
                        name=st.get("name", ""),
                        exchange=st.get("exchange", ""),
                        direction=st.get("direction", "neutral"),
                        reasoning=st.get("reasoning", ""),
                    )
                    for st in s.get("stocks", [])
                ]
                sectors.append(
                    SectorImpactResponse(
                        sector=s.get("sector", ""),
                        direction=s.get("direction", "neutral"),
                        magnitude=s.get("magnitude", "medium"),
                        reasoning=s.get("reasoning", ""),
                        region=s.get("region", "GLOBAL"),
                        stocks=stocks,
                    )
                )
        except (json.JSONDecodeError, TypeError):
            pass

    now = datetime.now(timezone.utc)
    return MarketImpactResponse(
        id=props["id"],
        short_id=props.get("short_id"),
        event_id=props.get("event_id"),
        summary=props.get("summary", ""),
        analysis_date=props.get("analysis_date"),
        sectors=sectors,
        created_at=props.get("created_at", now),
        updated_at=props.get("updated_at", now),
    )


async def list_market_impacts(
    page: int = 1,
    page_size: int = 20,
) -> PaginatedResponse[MarketImpactResponse]:
    skip = (page - 1) * page_size

    count_query = "MATCH (mi:MarketImpact) RETURN count(mi) AS total"
    data_query = """
        MATCH (mi:MarketImpact)
        ORDER BY mi.analysis_date DESC
        SKIP $skip
        LIMIT $limit
        RETURN mi
    """

    count_records = await execute_query(count_query, {})
    total = count_records[0]["total"] if count_records else 0

    records = await execute_query(data_query, {"skip": skip, "limit": page_size})
    items = [_node_to_market_impact(r["mi"]) for r in records]

    total_pages = max(1, -(-total // page_size))
    return PaginatedResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


async def get_market_impacts_by_event(event_short_id: str) -> list[MarketImpactResponse]:
    query = """
        MATCH (mi:MarketImpact {event_id: $event_id})
        RETURN mi
        ORDER BY mi.analysis_date DESC
    """
    records = await execute_query(query, {"event_id": event_short_id})
    return [_node_to_market_impact(r["mi"]) for r in records]
