---
id: question.nats-core-vs-jetstream
title: "NATS: Survive Consumer Downtime"
slug: nats-core-vs-jetstream
difficulty: Medium
topic: topic.distributed-systems
estimated_time: 15
updated: 2026-08-06
---

## Why This Is Asked

An inventory worker may be offline for several hours, while a live dashboard only needs current updates. This tests whether a candidate can select Core NATS or JetStream for each path and explain the resulting delivery guarantees.

## Key Concepts

- **Core NATS:** Subject-based, low-latency, best-effort messaging for active subscribers.
- **JetStream:** Durable streams persist messages and support replayable consumers and stronger delivery semantics.
- **Retention:** Stream retention and consumer acknowledgement policy determine storage and redelivery behavior.
- **Workload choice:** Ephemeral signals and request/reply differ from durable business events and offline consumer recovery.

## Question Variations

- "When is Core NATS a better fit than JetStream?"
- "How does JetStream enable consumer replay?"
- "What does a durable consumer retain?"
- "How should subject naming support service ownership?"
