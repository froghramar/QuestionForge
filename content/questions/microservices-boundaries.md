---
id: question.microservices-boundaries
title: Microservice Boundaries
slug: microservice-boundaries
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This reveals whether a candidate can use microservices to reduce independent change and deployment risk instead of distributing a monolith prematurely. Interviewers assess domain boundary design, data ownership, communication patterns, and the operational cost of coordinating many services.

## Key Concepts

- **Bounded contexts:** Split services around cohesive business capabilities and team ownership, not database tables or technical layers.
- **Data ownership:** Each service owns its data and exposes it through a contract; shared databases tightly couple deployment and schema changes.
- **Distributed workflows:** Replace cross-service transactions with explicit workflows, compensations, and eventually consistent views where appropriate.
- **Operational maturity:** Plan for service discovery, observability, deployment automation, failure isolation, and contract testing before increasing service count.

## Question Variations

- "What signals suggest a monolith should be split into services?"
- "Why is a shared database an anti-pattern for independent microservices?"
- "How would you handle an order workflow spanning payment and inventory services?"
- "What are the operational costs of adopting microservices?"
