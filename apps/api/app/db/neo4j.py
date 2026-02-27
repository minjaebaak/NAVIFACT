"""Neo4j async driver wrapper with connection-pool management."""

from typing import Any

from neo4j import AsyncDriver, AsyncGraphDatabase, Record

from app.config import settings

_driver: AsyncDriver | None = None


async def init_driver() -> AsyncDriver:
    """Create and verify the Neo4j async driver (called at startup)."""
    global _driver
    _driver = AsyncGraphDatabase.driver(
        settings.neo4j_uri,
        auth=(settings.neo4j_user, settings.neo4j_password),
    )
    await _driver.verify_connectivity()
    return _driver


def get_driver() -> AsyncDriver:
    """Return the current driver instance. Raises if not initialised."""
    if _driver is None:
        raise RuntimeError("Neo4j driver has not been initialised. Call init_driver() first.")
    return _driver


async def close_driver() -> None:
    """Close the driver and release all pooled connections."""
    global _driver
    if _driver is not None:
        await _driver.close()
        _driver = None


async def execute_query(
    query: str,
    parameters: dict[str, Any] | None = None,
    *,
    database: str = "neo4j",
) -> list[Record]:
    """Run a Cypher query and return the list of result records.

    This is a thin convenience wrapper around the driver's
    ``execute_query`` method so callers don't need to unpack
    the ``EagerResult`` tuple themselves.
    """
    driver = get_driver()
    result = await driver.execute_query(
        query,
        parameters_=parameters or {},
        database_=database,
    )
    # driver.execute_query returns (records, summary, keys)
    return list(result.records)
