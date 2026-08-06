---
id: question.event-driven-architecture
title: Event-Driven Architecture
slug: event-driven-architecture
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This assesses whether a candidate can design asynchronous collaboration between independently deployed components without assuming messages are delivered exactly once or in a global order. A strong answer explains event contracts, delivery guarantees, idempotent consumers, ordering, replay, and observability.

## Key Concepts

- **Events and commands:** Events report facts that occurred, whereas commands request work; consumers should not infer an event was a guaranteed instruction.
- **Delivery semantics:** Most brokers offer at-least-once delivery, so consumers need idempotency and durable handling of duplicates.
- **Publishing reliably:** Use the transactional outbox pattern or an equivalent mechanism to avoid committing database state without publishing its event.
- **Ordering and recovery:** Define ordering scope, version event schemas, route poison messages safely, and support replay without corrupting projections.

## Question Variations

- "How do you make an event consumer idempotent?"
- "What problem does the transactional outbox pattern solve?"
- "Why is exactly-once processing difficult in distributed systems?"
- "How would you evolve an event schema used by several consumers?"
