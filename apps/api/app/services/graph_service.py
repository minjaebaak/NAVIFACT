"""Core graph service — Cypher queries for causal chains, subgraphs, and paths."""

from uuid import UUID

from app.db.neo4j import execute_query
from app.models.event import CausalChainResponse, CausalLink, CausalLinkDirection, EventResponse
from app.models.graph import (
    GraphEdge,
    GraphNode,
    ShortestPathResponse,
    SubgraphResponse,
)


async def get_causal_chain(
    event_id: UUID,
    direction: CausalLinkDirection = CausalLinkDirection.DOWNSTREAM,
    depth: int = 3,
    min_confidence: float = 0.0,
) -> CausalChainResponse:
    """Traverse causal links from an event and return the chain.

    Parameters
    ----------
    event_id:
        Starting event node.
    direction:
        ``upstream`` follows CAUSED edges in reverse, ``downstream``
        follows them forward, ``both`` does both.
    depth:
        Maximum traversal depth.
    min_confidence:
        Minimum confidence threshold on the CAUSED relationship.
    """

    if direction == CausalLinkDirection.UPSTREAM:
        rel = "<-[r:CAUSED*1..{depth}]-"
    elif direction == CausalLinkDirection.DOWNSTREAM:
        rel = "-[r:CAUSED*1..{depth}]->"
    else:
        rel = "-[r:CAUSED*1..{depth}]-"

    # Build the Cypher query with variable-length path
    rel = rel.format(depth=depth)
    query = f"""
        MATCH path = (start:Event {{id: $event_id}}){rel}(other:Event)
        WHERE ALL(rel IN relationships(path) WHERE rel.confidence >= $min_confidence)
        UNWIND nodes(path) AS n
        UNWIND relationships(path) AS rel_item
        WITH COLLECT(DISTINCT n) AS nodes, COLLECT(DISTINCT rel_item) AS rels
        RETURN nodes, rels
    """

    records = await execute_query(
        query,
        {"event_id": str(event_id), "min_confidence": min_confidence},
    )

    events: list[EventResponse] = []
    links: list[CausalLink] = []

    if records:
        record = records[0]
        for node in record["nodes"]:
            props = dict(node)
            events.append(
                EventResponse(
                    id=props["id"],
                    short_id=props.get("short_id"),
                    title=props.get("title", ""),
                    description=props.get("description", ""),
                    date=props.get("date"),
                    category=props.get("category", "political"),
                    credibility_score=props.get("credibility_score", 0.0),
                    status=props.get("status"),
                    created_at=props.get("created_at"),
                    updated_at=props.get("updated_at"),
                )
            )
        for rel in record["rels"]:
            links.append(
                CausalLink(
                    source_event_id=rel.start_node["id"],
                    target_event_id=rel.end_node["id"],
                    relationship_type=rel.type,
                    confidence=rel.get("confidence", 1.0),
                    description=rel.get("description"),
                )
            )

    return CausalChainResponse(
        root_event_id=event_id,
        direction=direction,
        depth=depth,
        events=events,
        links=links,
    )


async def get_subgraph(
    center_event_id: UUID,
    radius: int = 2,
) -> SubgraphResponse:
    """Return a neighbourhood subgraph centred on the given event.

    All CAUSED relationships within ``radius`` hops are included.
    """
    query = """
        MATCH path = (center:Event {id: $center_id})-[r:CAUSED*0..{radius}]-(other:Event)
        UNWIND nodes(path) AS n
        UNWIND relationships(path) AS rel
        WITH COLLECT(DISTINCT n) AS nodes, COLLECT(DISTINCT rel) AS rels
        RETURN nodes, rels
    """.replace("{radius}", str(radius))

    records = await execute_query(query, {"center_id": str(center_event_id)})

    nodes: list[GraphNode] = []
    edges: list[GraphEdge] = []

    if records:
        record = records[0]
        for node in record["nodes"]:
            props = dict(node)
            nodes.append(
                GraphNode(
                    id=props["id"],
                    label=props.get("title", ""),
                    type="event",
                    properties={
                        k: v
                        for k, v in props.items()
                        if k not in ("id", "title")
                    },
                )
            )
        for rel in record["rels"]:
            edges.append(
                GraphEdge(
                    source=rel.start_node["id"],
                    target=rel.end_node["id"],
                    relationship=rel.type,
                    confidence=rel.get("confidence", 1.0),
                )
            )

    return SubgraphResponse(
        nodes=nodes,
        edges=edges,
        center_node_id=center_event_id,
        radius=radius,
    )


async def get_shortest_path(
    from_id: UUID,
    to_id: UUID,
) -> ShortestPathResponse:
    """Find the shortest causal path between two events."""
    query = """
        MATCH path = shortestPath(
            (a:Event {id: $from_id})-[:CAUSED*]-(b:Event {id: $to_id})
        )
        RETURN nodes(path) AS nodes, relationships(path) AS rels
    """

    records = await execute_query(
        query,
        {"from_id": str(from_id), "to_id": str(to_id)},
    )

    nodes: list[GraphNode] = []
    edges: list[GraphEdge] = []

    if records:
        record = records[0]
        for node in record["nodes"]:
            props = dict(node)
            nodes.append(
                GraphNode(
                    id=props["id"],
                    label=props.get("title", ""),
                    type="event",
                )
            )
        for rel in record["rels"]:
            edges.append(
                GraphEdge(
                    source=rel.start_node["id"],
                    target=rel.end_node["id"],
                    relationship=rel.type,
                    confidence=rel.get("confidence", 1.0),
                )
            )

    return ShortestPathResponse(
        from_event_id=from_id,
        to_event_id=to_id,
        path_length=len(edges),
        nodes=nodes,
        edges=edges,
    )
