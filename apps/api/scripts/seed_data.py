"""Seed the Neo4j database with sample data for development."""

import asyncio

from app.config import settings
from app.db.neo4j import close_driver, execute_query, init_driver


async def seed() -> None:
    """Insert a handful of sample events and causal links."""
    await init_driver()

    print(f"Seeding Neo4j at {settings.neo4j_uri} ...")

    # --- Sample events ---
    events_cypher = """
        CREATE (e1:Event {
            id: 'a0000000-0000-0000-0000-000000000001',
            title: 'Assassination of Archduke Franz Ferdinand',
            description: 'Archduke Franz Ferdinand of Austria was assassinated in Sarajevo on 28 June 1914.',
            date: datetime('1914-06-28T00:00:00Z'),
            location: 'Sarajevo',
            category: 'political',
            source_urls: ['https://en.wikipedia.org/wiki/Assassination_of_Archduke_Franz_Ferdinand'],
            tags: ['wwi', 'assassination'],
            credibility_score: 0.99,
            created_at: datetime(),
            updated_at: datetime()
        })
        CREATE (e2:Event {
            id: 'a0000000-0000-0000-0000-000000000002',
            title: 'Austria-Hungary declares war on Serbia',
            description: 'Austria-Hungary declared war on Serbia on 28 July 1914, one month after the assassination.',
            date: datetime('1914-07-28T00:00:00Z'),
            location: 'Vienna',
            category: 'military',
            source_urls: [],
            tags: ['wwi', 'declaration_of_war'],
            credibility_score: 0.98,
            created_at: datetime(),
            updated_at: datetime()
        })
        CREATE (e3:Event {
            id: 'a0000000-0000-0000-0000-000000000003',
            title: 'Treaty of Versailles signed',
            description: 'The Treaty of Versailles was signed on 28 June 1919, officially ending World War I.',
            date: datetime('1919-06-28T00:00:00Z'),
            location: 'Versailles',
            category: 'legal',
            source_urls: [],
            tags: ['wwi', 'treaty'],
            credibility_score: 0.99,
            created_at: datetime(),
            updated_at: datetime()
        })
        CREATE (e1)-[:CAUSED {confidence: 0.95, description: 'Direct trigger for the declaration of war'}]->(e2)
        CREATE (e2)-[:CAUSED {confidence: 0.85, description: 'The war led to the Treaty of Versailles'}]->(e3)
    """
    await execute_query(events_cypher)
    print("  Created 3 sample events with 2 causal links.")

    # --- Sample agreement ---
    agreement_cypher = """
        CREATE (a:Agreement {
            id: 'b0000000-0000-0000-0000-000000000001',
            title: 'Treaty of Versailles',
            description: 'Peace treaty ending World War I.',
            agreement_type: 'treaty',
            signed_date: datetime('1919-06-28T00:00:00Z'),
            parties: ['Allied Powers', 'Germany'],
            event_id: 'a0000000-0000-0000-0000-000000000003',
            source_urls: [],
            created_at: datetime(),
            updated_at: datetime()
        })
        CREATE (o1:Obligation {
            id: 'c0000000-0000-0000-0000-000000000001',
            title: 'War guilt clause acceptance',
            description: 'Germany accepts responsibility for the war.',
            responsible_party: 'Germany',
            status: 'fulfilled',
            created_at: datetime(),
            updated_at: datetime()
        })
        CREATE (o2:Obligation {
            id: 'c0000000-0000-0000-0000-000000000002',
            title: 'Reparations payments',
            description: 'Germany pays financial reparations to the Allied Powers.',
            responsible_party: 'Germany',
            status: 'violated',
            created_at: datetime(),
            updated_at: datetime()
        })
        CREATE (a)-[:HAS_OBLIGATION]->(o1)
        CREATE (a)-[:HAS_OBLIGATION]->(o2)
    """
    await execute_query(agreement_cypher)
    print("  Created 1 sample agreement with 2 obligations.")

    # --- Sample prediction market ---
    market_cypher = """
        CREATE (m:PredictionMarket {
            id: 'd0000000-0000-0000-0000-000000000001',
            question: 'Will the UN General Assembly pass a new climate resolution in 2026?',
            description: 'Market on whether the UNGA adopts a binding climate resolution before end of 2026.',
            status: 'open',
            yes_probability: 0.62,
            total_pool: 5000,
            closes_at: datetime('2026-12-31T23:59:59Z'),
            created_at: datetime(),
            updated_at: datetime()
        })
    """
    await execute_query(market_cypher)
    print("  Created 1 sample prediction market.")

    await close_driver()
    print("Done.")


if __name__ == "__main__":
    asyncio.run(seed())
