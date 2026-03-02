"""Activity service — log user actions for activity feeds."""

import json
from uuid import UUID

from app.db.neo4j import execute_query


async def log_activity(
    user_id: UUID,
    action: str,
    summary: str,
    metadata: dict | None = None,
) -> None:
    """Create an Activity node linked to the user."""
    query = """
        MATCH (u:User {id: $user_id})
        CREATE (a:Activity {
            id: randomUUID(),
            user_id: $user_id,
            action: $action,
            summary: $summary,
            metadata_json: $metadata_json,
            created_at: datetime()
        })
        CREATE (u)-[:DID]->(a)
    """
    await execute_query(
        query,
        {
            "user_id": str(user_id),
            "action": action,
            "summary": summary,
            "metadata_json": json.dumps(metadata) if metadata else None,
        },
    )
