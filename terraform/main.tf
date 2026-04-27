# Devopstrio AVD Security Baseline
# Core Cyber Infrastructure (Terraform)
# Target: Azure RM

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Security Core Resource Group
resource "azurerm_resource_group" "sec_rg" {
  name     = "rg-avd-security-prd"
  location = "uksouth"
  tags = {
    Domain     = "Cyber-Governance"
    Automation = "Security-Baseline"
  }
}

# 2. Centralized Log Analytics Workspace (The SOC Hub)
resource "azurerm_log_analytics_workspace" "law" {
  name                = "law-avd-security-prd"
  location            = azurerm_resource_group.sec_rg.location
  resource_group_name = azurerm_resource_group.sec_rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 90 # Extended for Audit compliance
}

# 3. Microsoft Sentinel (The SIEM Plane)
resource "azurerm_log_analytics_solution" "sentinel" {
  solution_name         = "SecurityInsights"
  location              = azurerm_resource_group.sec_rg.location
  resource_group_name   = azurerm_resource_group.sec_rg.name
  workspace_resource_id = azurerm_log_analytics_workspace.law.id
  workspace_name        = azurerm_log_analytics_workspace.law.name

  plan {
    publisher = "Microsoft"
    product   = "OMSGallery/SecurityInsights"
  }
}

# 4. Key Vault (Security Secrets & Keys)
resource "azurerm_key_vault" "sec_vault" {
  name                = "kv-avd-security-secrets"
  location            = azurerm_resource_group.sec_rg.location
  resource_group_name = azurerm_resource_group.sec_rg.name
  tenant_id           = "your-tenant-id"
  sku_name            = "premium" # FIPS 140-2 Level 3 HSM support

  access_policy {
    tenant_id = "your-tenant-id"
    object_id = "secops-managed-identity-id"
    secret_permissions = ["Get", "List", "Set", "Delete"]
  }
}

# 5. Storage Account (Immutable Security Logs)
resource "azurerm_storage_account" "sec_archive" {
  name                     = "stavdsecarchiveprd"
  resource_group_name      = azurerm_resource_group.sec_rg.name
  location                 = azurerm_resource_group.sec_rg.location
  account_tier             = "Standard"
  account_replication_type = "GRS"

  blob_properties {
    delete_retention_policy {
      days = 365
    }
  }
}

# 6. Azure Policy Definition (Baseline Mapping)
resource "azurerm_policy_definition" "avd_baseline" {
  name         = "AVD-Security-Baseline-Deny-Public-IP"
  policy_type  = "Custom"
  mode         = "All"
  display_name = "Deny Public IP Assignment to AVD Session Hosts"

  policy_rule = <<POLICY
{
    "if": {
        "allOf": [
            {
                "field": "type",
                "equals": "Microsoft.Network/networkInterfaces"
            },
            {
                "not": {
                    "field": "Microsoft.Network/networkInterfaces/ipConfigurations[*].publicIpAddress",
                    "exists": false
                }
            }
        ]
    },
    "then": {
        "effect": "deny"
    }
}
POLICY
}

# Outputs
output "sentinel_workspace_id" {
  value = azurerm_log_analytics_workspace.law.workspace_id
}

output "security_vault_uri" {
  value = azurerm_key_vault.sec_vault.vault_uri
}
