---
id: question.nats-jetstream-work-queue
title: "NATS: Durable Image Jobs"
slug: nats-jetstream-work-queue
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

Users upload images faster than processors can resize them, and workers can restart during processing. This tests whether a candidate can configure a JetStream work queue with durable consumers, acknowledgements, redelivery, and monitoring.

## Key Concepts

- **Work-queue retention:** Messages are retained until a consumer acknowledges their successful processing.
- **Durable consumer:** Progress survives worker restarts and supports horizontal worker groups.
- **Acknowledgement policy:** Ack after storage of the resized image, not on receipt.
- **Backlog operations:** Monitor pending count and redeliveries; scale workers without losing ownership semantics.

## Question Variations

- "What happens if an image worker dies before acknowledging?"
- "When would a pull consumer be preferable to a push consumer?"
- "How should a JetStream worker make image processing idempotent?"
