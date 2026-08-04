---
id: question.oauth2-client-credentials-scopes
title: OAuth client credentials, scopes, audience
slug: oauth2-client-credentials-scopes
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.oauth2
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

This distinguishes user-delegated authorization from service-to-service authorization. Interviewers want to see whether you can choose client credentials appropriately, restrict machine tokens to the intended API and permissions, and protect the client credential as a production secret.

## Key Concepts

- **Client credentials:** A client authenticates as itself; there is no end-user authorization step.
- **Scopes:** Permissions requested and granted to the token.
- **Audience:** The resource server that is expected to accept the token.
- **Credential protection:** Prefer workload identity or asymmetric client authentication over broadly shared static secrets.

## Question Variations

- "When is client credentials the right OAuth grant?"
- "How do scopes differ from an audience?"
- "Why should an API validate both scope and audience?"
