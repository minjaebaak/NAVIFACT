"""Pydantic models for graph visualisation payloads."""

from uuid import UUID

from pydantic import BaseModel, Field


class GraphNode(BaseModel):
    """A node in the renderable subgraph."""

    id: UUID
    label: str
    type: str = "event"
    properties: dict[str, str | int | float | bool | None] = Field(default_factory=dict)


class GraphEdge(BaseModel):
    """An edge in the renderable subgraph."""

    source: UUID
    target: UUID
    relationship: str = "CAUSED"
    confidence: float = Field(ge=0, le=1, default=1.0)
    properties: dict[str, str | int | float | bool | None] = Field(default_factory=dict)


class SubgraphResponse(BaseModel):
    """A subgraph of nodes and edges suitable for front-end rendering."""

    nodes: list[GraphNode]
    edges: list[GraphEdge]
    center_node_id: UUID | None = None
    radius: int = Field(ge=0, default=2)


class ShortestPathResponse(BaseModel):
    """Result of a shortest-path query between two events."""

    from_event_id: UUID
    to_event_id: UUID
    path_length: int = Field(ge=0)
    nodes: list[GraphNode]
    edges: list[GraphEdge]
