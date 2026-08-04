---
id: question.jwt-revocation
title: JWT expiration and revocation
slug: jwt-expiration-revocation
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.jwt-security
  - concept.auth-types
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

JWTs can be verified without a session lookup, but that property makes immediate invalidation a design choice rather than a default. Interviewers use this to assess token lifetime design, logout and incident response, refresh-token rotation, and trade-offs between statelessness and control.

## Key Concepts

- **Expiration:** Short-lived access tokens bound the replay window.
- **Revocation state:** Deny lists, session versions, and introspection add a server-side check.
- **Refresh tokens:** Rotated, revocable credentials can continue a session without long-lived access tokens.
- **Key rotation:** Broadly invalidates tokens only when keys are retired and is not a routine logout mechanism.

## Question Variations

- "Can a JWT be revoked without server-side state?"
- "How would you log a user out of every device?"
- "What should happen after refresh-token reuse is detected?"
