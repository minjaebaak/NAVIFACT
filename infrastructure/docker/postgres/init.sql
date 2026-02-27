-- =============================================================
-- NAVIFACT PostgreSQL Schema
-- Relational data: Users, Fact Checks, Contributions,
--                   Prediction Markets, Bets, Point Transactions
-- =============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'reader',
    points_balance INTEGER DEFAULT 1000,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Source Registry
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(500) NOT NULL,
    url TEXT,
    source_type VARCHAR(50) NOT NULL,
    reliability_score FLOAT DEFAULT 0.5,
    organization VARCHAR(500),
    country VARCHAR(100),
    language VARCHAR(10) DEFAULT 'ko',
    archived_blob_key TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fact Verification Records
CREATE TABLE fact_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_id UUID NOT NULL,
    event_id UUID NOT NULL,
    verifier_type VARCHAR(50) NOT NULL,
    verifier_id UUID REFERENCES users(id),
    verdict VARCHAR(50) NOT NULL,
    confidence FLOAT NOT NULL,
    reasoning TEXT NOT NULL,
    evidence_ids UUID[] NOT NULL DEFAULT '{}',
    methodology TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contributions / Audit Log
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    data_before JSONB,
    data_after JSONB,
    status VARCHAR(50) DEFAULT 'pending',
    reviewer_id UUID REFERENCES users(id),
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prediction Markets
CREATE TABLE prediction_markets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expected_action_id UUID NOT NULL,
    question TEXT NOT NULL,
    description TEXT,
    yes_pool INTEGER DEFAULT 0,
    no_pool INTEGER DEFAULT 0,
    resolution_criteria TEXT NOT NULL,
    deadline TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    outcome VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    settled_at TIMESTAMPTZ
);

-- Bets
CREATE TABLE bets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    market_id UUID REFERENCES prediction_markets(id) NOT NULL,
    side VARCHAR(10) NOT NULL CHECK (side IN ('yes', 'no')),
    amount INTEGER NOT NULL CHECK (amount > 0),
    payout INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Point Transactions
CREATE TABLE point_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) NOT NULL,
    amount INTEGER NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    reference_id UUID,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_fact_checks_claim_id ON fact_checks(claim_id);
CREATE INDEX idx_fact_checks_event_id ON fact_checks(event_id);
CREATE INDEX idx_bets_user_id ON bets(user_id);
CREATE INDEX idx_bets_market_id ON bets(market_id);
CREATE INDEX idx_point_transactions_user_id ON point_transactions(user_id);
CREATE INDEX idx_prediction_markets_status ON prediction_markets(status);
CREATE INDEX idx_contributions_entity ON contributions(entity_type, entity_id);

-- Insert default admin user (password: admin123 - CHANGE IN PRODUCTION)
INSERT INTO users (email, username, password_hash, role, points_balance) VALUES
    ('admin@navifact.io', 'admin', '$2b$12$LQv3c1yqBo9SkvXS7QTJJuJHwWFcH5nHmyXjxTdKFvXdRvPBUZkGa', 'admin', 99999);
