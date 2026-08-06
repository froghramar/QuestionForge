---
id: question.azure-service-bus-sessions
title: "Service Bus: Ordered Per-Order Work"
slug: azure-service-bus-sessions
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

Several order events may arrive quickly, but cancellation must not run before creation for the same order. This tests whether a candidate can use Service Bus sessions to serialize related work while keeping different orders parallel.

## Key Concepts

- **Session ID:** Assign the order ID so related messages are grouped into one session.
- **Exclusive session lock:** One receiver processes a given session at a time, preserving its delivery sequence.
- **Parallelism:** Different sessions can be handled concurrently by separate processors.
- **Idempotency:** Lock expiry and settlement failures still allow redelivery, so sessions are not exactly-once processing.

## Question Variations

- "Why is a session ID not a global ordering guarantee?"
- "How would you scale session-enabled consumers?"
- "What happens if a receiver loses its session lock?"
