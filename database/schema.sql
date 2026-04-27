-- Devopstrio AVD Security Baseline
-- Core Cyber Governance & Posture Schema
-- Target: PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Identity & Tenancy
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    azure_tenant_id VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'SecurityAuditor', -- SecOps, CISO, Auditor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Policy & Compliance Control
CREATE TABLE IF NOT EXISTS policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(50) NOT NULL, -- Identity, Network, Endpoint, Data
    definition JSONB NOT NULL,
    compliance_standard VARCHAR(50) DEFAULT 'CIS-L1', -- CIS-L1, ISO27001, NIST
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exceptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    policy_id UUID REFERENCES policies(id),
    resource_id VARCHAR(255) NOT NULL,
    justification TEXT NOT NULL,
    expiry_date TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Hardening & Vulnerability
CREATE TABLE IF NOT EXISTS hardening_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100), -- HostPool, VM, Storage
    score INT CHECK (score >= 0 AND score <= 100),
    failed_controls JSONB,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Threat & Anomaly Intelligence
CREATE TABLE IF NOT EXISTS threat_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    severity VARCHAR(20) NOT NULL, -- Critical, High, Medium, Low
    source VARCHAR(100) NOT NULL, -- Sentinel, Defender, IdentityEngine
    event_type VARCHAR(100) NOT NULL, -- ImpossibleTravel, LateralMovement, OutdatedOS
    resource_id VARCHAR(255),
    details JSONB,
    status VARCHAR(20) DEFAULT 'Active', -- Active, Remediated, Suppressed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Analytics & Audit
CREATE TABLE IF NOT EXISTS metrics (
    id BIGSERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL, -- Overall_Compliance, Identity_Risk, Network_Drift
    value FLOAT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    resource_id VARCHAR(255),
    change_diff JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Strategic Intelligence Indexes
CREATE INDEX idx_policy_domain ON policies(domain);
CREATE INDEX idx_threat_severity ON threat_events(severity);
CREATE INDEX idx_threat_status ON threat_events(status);
CREATE INDEX idx_hardening_score ON hardening_scores(score);
CREATE INDEX idx_audit_time ON audit_logs(created_at);
CREATE INDEX idx_metric_time ON metrics(timestamp);
