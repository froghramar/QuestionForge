---
id: concept.k8s-config
title: Configuration & Secrets (ConfigMaps vs. Secrets)
slug: k8s-config
topic: topic.orchestration
description: How Kubernetes manages application configuration and sensitive data.
---
# Configuration Management in Kubernetes

Kubernetes provides two primary objects for injecting configuration into containers at runtime, allowing you to keep your container images generic and environment-agnostic.

## 1. ConfigMaps
- **Purpose:** Storing non-sensitive configuration data (e.g., config files, environment variables, command-line arguments).
- **Format:** Key-value pairs.
- **Usage:** Can be mounted as files or injected as environment variables.

## 2. Secrets
- **Purpose:** Storing sensitive data (e.g., passwords, API keys, SSH keys, TLS certificates).
- **Format:** Key-value pairs, where values are **Base64 encoded**.
- **Security:** In a default cluster, Secrets are only obfuscated (Base64), not encrypted. For true security, they should be encrypted at rest (using a provider like AWS KMS or HashiCorp Vault).
- **Usage:** Similar to ConfigMaps, can be mounted as files or environment variables.

## How to Inject Them
1.  **Environment Variables:** Best for simple flags and settings.
2.  **Volumes (Files):** Best for large configuration files. If the ConfigMap/Secret is updated, the files in the volume are eventually updated by the kubelet without a restart (if using the subPath feature, they are not updated).
