---
id: question.oauth2-token-exchange
title: OAuth token exchange and delegation
slug: oauth2-token-exchange
difficulty: Expert
topic: topic.web-fundamentals
concepts:
  - concept.oauth2
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

This tests whether a candidate can preserve least privilege as requests cross service boundaries. Interviewers look for the difference between forwarding a broad user token and exchanging it for a constrained token that names the downstream resource and delegated authority.

## Key Concepts

- **Token exchange:** An authorization server issues a new token based on a subject token and requested target.
- **Audience restriction:** A downstream token is accepted only by its intended resource server.
- **Delegation chain:** The token can distinguish the user subject from the acting client or service.
- **Least privilege:** Narrow scopes, audience, and lifetime at every hop.

## Question Variations

- "Why is forwarding the original access token across services risky?"
- "How does token exchange reduce audience confusion?"
- "What is the difference between delegation and impersonation?"
