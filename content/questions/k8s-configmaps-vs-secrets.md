---
id: question.k8s-configmaps-vs-secrets
title: ConfigMaps vs. Secrets
slug: k8s-configmaps-vs-secrets
difficulty: Easy
topic: topic.orchestration
concepts:
  - concept.k8s-config
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

This question verifies that a candidate knows how to handle application configuration securely. It distinguishes between general settings and sensitive credentials, which is a fundamental DevOps best practice.

## Key Concepts

- **Obfuscation vs. Encryption:** The common misconception that Base64 is secure.
- **Environment Agnosticism:** Keeping one image for Dev, Staging, and Prod.
- **Mounting Mechanisms:** Files vs. Environment variables.
- **Hot-reloading:** What happens when you update a ConfigMap while the app is running.
---
