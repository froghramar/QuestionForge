---
id: question.kafka-outbox-offsets
title: "Kafka: Database Write and Event"
slug: kafka-outbox-offsets
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

An API must create an order in its database and publish `order.created` to Kafka, even if the service crashes at an unlucky moment. This tests the dual-write problem, transactional outbox design, and safe consumer offset handling.

## Key Concepts

- **Dual-write gap:** A database commit and Kafka publish cannot be assumed to succeed atomically across separate systems.
- **Transactional outbox:** Persist the domain change and outbound event in one database transaction, then publish reliably.
- **Idempotent publication:** Use a stable event ID so publisher retries do not create semantically duplicated events.
- **Offset timing:** Commit a consumer offset only after the durable local effect succeeds.

## Question Variations

- "What failures can occur between a database write and Kafka publish?"
- "How does an outbox relay recover after a crash?"
- "Why isn't a Kafka transaction always enough for an API database write?"
