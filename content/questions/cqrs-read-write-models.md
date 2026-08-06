---
id: question.cqrs-read-write-models
title: CQRS Read and Write Models
slug: cqrs-read-write-models
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This tests whether a candidate understands CQRS as a selective separation of write-side business rules from read-side query models, not a requirement to use two databases everywhere. Interviewers look for a clear explanation of projection updates, consistency trade-offs, failure recovery, and when the additional complexity is justified.

## Key Concepts

- **Commands and queries:** Commands validate intent and change state; queries return data without creating business side effects.
- **Optimized models:** Read models can be denormalized and shaped for specific queries, while the write model protects invariants.
- **Eventual consistency:** Asynchronous projections can be stale, so the user experience and APIs must make freshness expectations explicit.
- **Projection reliability:** Track positions, make handlers idempotent, rebuild projections from source events or state, and monitor lag.

## Question Variations

- "When does CQRS provide enough value to justify its complexity?"
- "How do you handle a user reading data immediately after a successful command?"
- "How can a failed read-model projection be rebuilt safely?"
- "How does CQRS differ from event sourcing?"
