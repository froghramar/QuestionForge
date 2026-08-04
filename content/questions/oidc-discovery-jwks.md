---
id: question.oidc-discovery-jwks
title: OIDC discovery and JWKS
slug: oidc-discovery-jwks
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.openid-connect
  - concept.jwt-security
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

OIDC integrations need a secure way to find endpoints and signing keys without hardcoding every value. This question tests trust anchoring, metadata validation, key rotation, caching, and why discovery must not begin from an attacker-controlled issuer string.

## Key Concepts

- **Discovery document:** Issuer metadata at the well-known OpenID configuration endpoint.
- **JWKS:** A published set of public keys used to verify signed tokens.
- **Key IDs:** `kid` selects a candidate key during planned rotation.
- **Trust anchor:** The issuer is configured by the application before discovery starts.

## Question Variations

- "How does a relying party handle signing-key rotation?"
- "Why should an application configure an issuer rather than accept one from a request?"
- "What should happen when a token has an unknown kid?"
