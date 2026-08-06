---
id: question.rabbitmq-routing-reliability
title: "RabbitMQ: Routing Order Events"
slug: rabbitmq-routing-reliability
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

An order service must send `order.placed` to billing and inventory, but not to email until payment succeeds. This tests whether a candidate can choose exchanges and bindings while explaining what protects a message from being lost or processed twice.

## Key Concepts

- **Exchanges and bindings:** Producers publish to exchanges; bindings route messages to queues using type-specific rules.
- **Acknowledgements:** Consumers acknowledge only after durable processing so unacknowledged work can be redelivered.
- **Publisher confirms:** Producers learn whether the broker accepted responsibility for published messages.
- **Flow control:** Prefetch bounds unacknowledged deliveries and prevents one consumer from monopolizing work.

## Question Variations

- "Compare direct, topic, fanout, and headers exchanges."
- "When should a RabbitMQ consumer acknowledge a message?"
- "What are publisher confirms protecting against?"
- "How do dead-letter exchanges support failure recovery?"
