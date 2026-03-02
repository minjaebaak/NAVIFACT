"""Event service — CRUD and business logic for historical events."""

from uuid import UUID, uuid4

from app.db.neo4j import execute_query
from app.models.common import PaginatedResponse
from app.models.event import EventCreate, EventResponse


async def list_events(
    page: int = 1,
    page_size: int = 20,
    category: str | None = None,
) -> PaginatedResponse[EventResponse]:
    """Return a paginated list of events, optionally filtered by category."""
    where_clause = "WHERE e.category = $category" if category else ""
    skip = (page - 1) * page_size

    count_query = f"MATCH (e:Event) {where_clause} RETURN count(e) AS total"
    data_query = f"""
        MATCH (e:Event)
        {where_clause}
        ORDER BY e.date DESC
        SKIP $skip
        LIMIT $limit
        RETURN e
    """

    params: dict = {"skip": skip, "limit": page_size}
    if category:
        params["category"] = category

    count_records = await execute_query(count_query, params)
    total = count_records[0]["total"] if count_records else 0

    records = await execute_query(data_query, params)
    items = [_node_to_event(r["e"]) for r in records]

    total_pages = max(1, -(-total // page_size))  # ceiling division
    return PaginatedResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


async def get_event(event_id: UUID) -> EventResponse | None:
    """Fetch a single event by its id."""
    records = await execute_query(
        "MATCH (e:Event {id: $id}) RETURN e",
        {"id": str(event_id)},
    )
    if not records:
        return None
    return _node_to_event(records[0]["e"])


async def create_event(payload: EventCreate) -> EventResponse:
    """Persist a new Event node in Neo4j and return it."""
    event_id = str(uuid4())
    query = """
        CREATE (e:Event {
            id: $id,
            title: $title,
            description: $description,
            date: datetime($date),
            location: $location,
            category: $category,
            source_urls: $source_urls,
            tags: $tags,
            credibility_score: 0.0,
            created_at: datetime(),
            updated_at: datetime()
        })
        RETURN e
    """
    records = await execute_query(
        query,
        {
            "id": event_id,
            "title": payload.title,
            "description": payload.description,
            "date": payload.date.isoformat(),
            "location": payload.location,
            "category": payload.category.value,
            "source_urls": payload.source_urls,
            "tags": payload.tags,
        },
    )
    return _node_to_event(records[0]["e"])


def _neo4j_to_python_datetime(val):
    """Convert Neo4j Date/DateTime to Python datetime."""
    from datetime import datetime, timezone
    if val is None:
        return None
    if hasattr(val, 'to_native'):
        native = val.to_native()
        if isinstance(native, datetime):
            if native.tzinfo is None:
                return native.replace(tzinfo=timezone.utc)
            return native
        # neo4j.time.Date → date object, wrap as datetime
        return datetime(native.year, native.month, native.day, tzinfo=timezone.utc)
    if isinstance(val, str):
        return datetime.fromisoformat(val)
    return val


def _node_to_event(node: dict) -> EventResponse:
    """Map a Neo4j node dict to an EventResponse."""
    props = dict(node)
    return EventResponse(
        id=props["id"],
        short_id=props.get("short_id"),
        title=props["title"],
        description=props["description"],
        date=_neo4j_to_python_datetime(props["date"]),
        location=props.get("location"),
        category=props["category"],
        source_urls=props.get("source_urls", []),
        tags=props.get("tags", []),
        credibility_score=props.get("credibility_score", 0.0),
        status=props.get("status"),
        created_at=_neo4j_to_python_datetime(props["created_at"]),
        updated_at=_neo4j_to_python_datetime(props["updated_at"]),
    )
