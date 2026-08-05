---
id: question.express-rate-limiting
title: Express Rate Limiting
slug: express-rate-limiting
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Rate limiting is a common API protection with real trade-offs in key selection, distributed state, and client behavior. Interviewers want to see a design that limits abuse without creating an easy denial of service for legitimate users.

## Key Concepts

- A limit needs a scope, key, window or refill policy, and an explicit client response.
- User or tenant identity is often safer than IP alone after authentication.
- Distributed deployments need a shared atomic store or gateway-level enforcement.
- Authentication endpoints need stricter limits and careful error responses.

## Question Variations

- "Why is an in-memory Express rate limiter incorrect with multiple replicas?"
- "Should an API limit by IP address, user, or API key?"
- "What should a client do after receiving 429?"
