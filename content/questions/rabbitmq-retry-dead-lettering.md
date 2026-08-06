---
id: question.rabbitmq-retry-dead-lettering
title: "RabbitMQ: Delayed Retry Design"
slug: rabbitmq-retry-dead-lettering
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

An external shipping API intermittently returns 503, while invalid addresses never succeed. This tests whether a candidate can design bounded retries and dead-letter routing without requeue loops or lost diagnostics.

## Key Concepts

- **Retry classification:** Retry transient failures only; reject permanent validation errors.
- **Delay mechanism:** Use a delayed exchange or TTL retry queues to create backoff rather than immediate requeueing.
- **Dead-lettering:** Preserve failure reason and original routing information for repair and replay.
- **Bounded attempts:** Stop retrying after a controlled count to protect the broker and downstream API.

## Question Variations

- "Why is `nack(..., requeue=true)` dangerous for a persistent failure?"
- "How would you implement exponential backoff with RabbitMQ?"
- "What metadata should a dead-letter message retain?"
