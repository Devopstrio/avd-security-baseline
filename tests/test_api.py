import pytest
from fastapi.testclient import TestClient
from backend.src.main import app

# Devopstrio AVD Security Baseline
# Integration Tests for Cyber Governance & Hardening

client = TestClient(app)

def test_security_health_operational():
    """Verify that the security platform gateway and sentinel sync are active."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["sentinel_sync"] is True

def test_global_posture_retrieval():
    """Ensure the platform can report an authoritative security posture score."""
    response = client.get("/security/posture")
    assert response.status_code == 200
    assert response.json()["overall_score"] >= 90

def test_active_policy_catalog():
    """Verify that the platform can list currently enforced security policies."""
    response = client.get("/policies")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert "CIS-Windows-11-L1" in [p["name"] for p in response.json()]

def test_baseline_application_workflow():
    """Test the asynchronous rollout of a security baseline to a target scope."""
    payload = {
        "policy_name": "Hardened-Finance-Baseline",
        "target_scopes": ["rg-avd-emea-fin"],
        "hardening_level": "Strict"
    }
    response = client.post("/policies/apply", json=payload)
    assert response.status_code == 202
    assert "job_id" in response.json()

def test_threat_intelligence_listing():
    """Ensure the threat engine reports active defensive security events."""
    response = client.get("/threats")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_drift_remediation_trigger():
    """Verify the ability to manually or automatically trigger remediation."""
    payload = {
        "event_id": "evt-882",
        "action": "RevertBaseline"
    }
    response = client.post("/hardening/remediate", json=payload)
    assert response.status_code == 200
    assert response.json()["status"] == "Success"

def test_compliance_reporting_integrity():
    """Check that the platform provides scores against global compliance standards."""
    response = client.get("/compliance/score")
    assert response.status_code == 200
    assert "iso27001_readiness" in response.json()
