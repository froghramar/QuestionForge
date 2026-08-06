---
id: question.microservices-saga-pattern
title: Microservices Saga Pattern
slug: microservices-saga-pattern
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This assesses whether a candidate can preserve business consistency across services without relying on a distributed database transaction. Interviewers look for local transactions, compensations, coordination choices, and clear handling of irreversible actions.

## Key Concepts

- **Local transactions:** Each service commits its own state independently.
- **Compensations:** A later failure triggers a semantic undo action, not a database rollback across services.
- **Coordination:** Choreography uses events; orchestration uses a central workflow owner.
- **Recovery:** Steps and compensations must be idempotent, observable, and retryable.

## Question Variations

- "Design an order saga across inventory and payment services."
- "When is orchestration preferable to choreography?"
- "Why is a compensation not always a perfect undo?"
- "How would you recover a saga stuck after a timeout?"
