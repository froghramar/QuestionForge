---
id: question.grpc-deadlines-retries
title: gRPC Deadlines and Retries
slug: grpc-deadlines-retries
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This tests whether a candidate can make RPC calls fail fast and recover safely under partial failure. Interviewers expect deadline propagation, idempotency-aware retries, backoff, and an understanding of retry amplification.

## Key Concepts

- **Deadlines:** Bound the full request budget and propagate it to downstream calls.
- **Retry eligibility:** Retry only transient failures and operations whose effects can safely be repeated.
- **Backoff and jitter:** Spread retries to avoid synchronized load spikes.
- **Failure containment:** Combine timeouts, circuit breaking, and load shedding to prevent cascading failures.

## Question Variations

- "Why should every gRPC call have a deadline?"
- "Which gRPC status codes are candidates for retry?"
- "How can retries cause an outage to worsen?"
- "How would you make a reserve-inventory RPC safe to retry?"
