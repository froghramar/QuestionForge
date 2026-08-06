---
id: question.rabbitmq-redelivery-idempotency
title: "RabbitMQ: Duplicate Payment Jobs"
slug: rabbitmq-redelivery-idempotency
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

A worker charges a payment provider, then crashes before acknowledging its RabbitMQ message. This tests whether a candidate can prevent a redelivery from charging the customer twice while retaining at-least-once delivery.

## Key Concepts

- **Manual acknowledgement:** Acknowledge only after the durable business effect is complete.
- **Idempotency key:** Use a stable payment or message ID to recognize a repeated charge attempt.
- **Atomic state:** Persist the processed message and payment outcome together when possible.
- **Failure policy:** Retry transient failures, but dead-letter invalid or exhausted messages for investigation.

## Question Variations

- "What happens when a consumer crashes after charging but before `ack`?"
- "Where would you store RabbitMQ deduplication state?"
- "Why is automatic acknowledgement unsafe for payment work?"
