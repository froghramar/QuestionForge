---
id: question.openid-connect-vs-oauth2
title: OpenID Connect vs OAuth 2.0
slug: openid-connect-vs-oauth2
difficulty: Medium
topic: topic.web-fundamentals
concepts:
  - concept.oauth2
  - concept.openid-connect
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

OAuth 2.0 is frequently and incorrectly described as a login protocol. This question tests whether a candidate distinguishes delegated API authorization from user authentication and knows what OIDC adds for a relying party that needs verified identity.

## Key Concepts

- **OAuth 2.0:** Delegates authorization to access protected resources.
- **OIDC:** Adds authentication and an ID Token with standardized identity claims.
- **Token audiences:** Access tokens are for resource servers; ID tokens are for the client application.
- **Verification:** A relying party validates issuer, audience, signature, expiration, and flow-specific claims.

## Question Variations

- "Can an access token be used as proof that a user signed in?"
- "What is the difference between an ID token and an access token?"
- "What does the OIDC nonce protect?"
