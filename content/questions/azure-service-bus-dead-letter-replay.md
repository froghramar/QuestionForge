---
id: question.azure-service-bus-dead-letter-replay
title: "Service Bus: Replay Dead Letters"
slug: azure-service-bus-dead-letter-replay
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

A schema bug has placed thousands of valid orders in an Azure Service Bus dead-letter queue. This tests how a candidate would diagnose, correct, replay, and observe recovery without duplicating already processed orders.

## Key Concepts

- **Reason inspection:** Dead-letter reason, description, delivery count, and application metadata identify the failure class.
- **Fix before replay:** Correct the producer, consumer, or contract issue before returning messages to the main path.
- **Idempotent replay:** Reuse stable message or business IDs so previously completed work is harmless on replay.
- **Controlled recovery:** Throttle and monitor replay to avoid recreating the outage or overwhelming downstream services.

## Question Variations

- "Why should dead-letter replay not be automatic?"
- "What distinguishes a poison message from a transient failure?"
- "How do you verify a DLQ drain did not lose work?"
