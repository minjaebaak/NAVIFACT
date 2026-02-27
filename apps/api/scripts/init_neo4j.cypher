// ============================================================
// NAVIFACT — Neo4j schema constraints and indexes
// Run once against a fresh database to set up the schema.
// ============================================================

// ---------- Uniqueness constraints ----------

CREATE CONSTRAINT event_id_unique IF NOT EXISTS
  FOR (e:Event) REQUIRE e.id IS UNIQUE;

CREATE CONSTRAINT claim_id_unique IF NOT EXISTS
  FOR (c:Claim) REQUIRE c.id IS UNIQUE;

CREATE CONSTRAINT agreement_id_unique IF NOT EXISTS
  FOR (a:Agreement) REQUIRE a.id IS UNIQUE;

CREATE CONSTRAINT obligation_id_unique IF NOT EXISTS
  FOR (o:Obligation) REQUIRE o.id IS UNIQUE;

CREATE CONSTRAINT narrative_id_unique IF NOT EXISTS
  FOR (n:Narrative) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT prediction_market_id_unique IF NOT EXISTS
  FOR (m:PredictionMarket) REQUIRE m.id IS UNIQUE;

CREATE CONSTRAINT bet_id_unique IF NOT EXISTS
  FOR (b:Bet) REQUIRE b.id IS UNIQUE;

CREATE CONSTRAINT user_id_unique IF NOT EXISTS
  FOR (u:User) REQUIRE u.id IS UNIQUE;

CREATE CONSTRAINT user_email_unique IF NOT EXISTS
  FOR (u:User) REQUIRE u.email IS UNIQUE;

CREATE CONSTRAINT user_username_unique IF NOT EXISTS
  FOR (u:User) REQUIRE u.username IS UNIQUE;

// ---------- Indexes for common look-ups ----------

CREATE INDEX event_category IF NOT EXISTS
  FOR (e:Event) ON (e.category);

CREATE INDEX event_date IF NOT EXISTS
  FOR (e:Event) ON (e.date);

CREATE INDEX claim_event_id IF NOT EXISTS
  FOR (c:Claim) ON (c.event_id);

CREATE INDEX claim_verdict IF NOT EXISTS
  FOR (c:Claim) ON (c.verdict);

CREATE INDEX obligation_status IF NOT EXISTS
  FOR (o:Obligation) ON (o.status);

CREATE INDEX prediction_market_status IF NOT EXISTS
  FOR (m:PredictionMarket) ON (m.status);

CREATE INDEX bet_market_id IF NOT EXISTS
  FOR (b:Bet) ON (b.market_id);

CREATE INDEX bet_user_id IF NOT EXISTS
  FOR (b:Bet) ON (b.user_id);

// ---------- Full-text search indexes ----------

CREATE FULLTEXT INDEX event_fulltext IF NOT EXISTS
  FOR (e:Event) ON EACH [e.title, e.description];

CREATE FULLTEXT INDEX claim_fulltext IF NOT EXISTS
  FOR (c:Claim) ON EACH [c.statement];

CREATE FULLTEXT INDEX narrative_fulltext IF NOT EXISTS
  FOR (n:Narrative) ON EACH [n.title, n.description];
