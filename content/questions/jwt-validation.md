---
id: question.jwt-validation
title: Secure JWT validation
slug: jwt-validation
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.jwt-security
  - concept.auth-types
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

JWTs are easy to decode, which can lead teams to confuse readable claims with trusted claims. Interviewers use this question to test cryptographic validation, strict claim checking, key management, and the limits of stateless revocation.

## Key Concepts

- **Signature verification:** Decode is not verification; accept only configured algorithms and trusted keys.
- **Registered claims:** Enforce expiration, issuer, audience, and any application-required claims.
- **Token purpose:** Do not accept a token issued for one resource server or client at another.
- **Confidentiality:** A signed JWS payload is readable; use encryption only when the design requires it.

## Question Variations

- "Why is accepting the JWT alg header blindly dangerous?"
- "What claims should an API validate?"
- "How do key rotation and JWKS work?"
- "How can a JWT be revoked before expiration?"
