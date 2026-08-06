---
id: question.rest-api-design
title: REST API Design
slug: rest-api-design
difficulty: Medium
topic: topic.distributed-systems
estimated_time: 15
updated: 2026-08-06
---

## Why This Is Asked

This tests whether a candidate can turn a domain model into a predictable HTTP interface that clients can use and evolve safely. Interviewers look for resource-oriented URLs, correct HTTP semantics, and practical decisions around errors, pagination, versioning, and idempotency.

## Key Concepts

- **Resources and representations:** Model nouns as resources, use consistent plural paths, and keep transport representations separate from persistence models.
- **HTTP semantics:** Choose methods, status codes, headers, and cache behavior that accurately describe the operation.
- **Idempotency and retries:** Design write endpoints so network retries do not accidentally create duplicate side effects.
- **Evolution:** Provide stable contracts through additive changes, clear deprecation, and a deliberate versioning strategy when breaking changes are unavoidable.

## Question Variations

- "Design REST endpoints for creating, listing, and cancelling orders."
- "When should an API use PUT instead of PATCH?"
- "How would you make a POST request safe to retry?"
- "How do cursor-based and offset pagination differ?"
