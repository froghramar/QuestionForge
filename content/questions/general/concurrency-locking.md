---
id: question.concurrency-locking
title: Optimistic vs Pessimistic Locking
slug: concurrency-locking-strategies
difficulty: Hard
topic: topic.distributed-systems
concepts:
  - concept.concurrency-control
companies:
  - company.amazon
  - company.stripe
  - company.microsoft
estimated_time: 15
updated: 2026-08-01
---

## Why This Is Asked

This tests your understanding of data consistency in concurrent systems. Interviewers want to see that you can reason about trade-offs between throughput and correctness, and that you can pick the right strategy based on contention levels.

## Key Concepts

- Pessimistic locking acquires a lock before reading, blocking other writers (and sometimes readers)
- Optimistic locking allows concurrent reads but checks for conflicts at write time (e.g., version columns, ETags)
- Pessimistic: high correctness guarantees, lower throughput, risk of deadlocks
- Optimistic: high throughput under low contention, but requires conflict resolution logic
- Real-world implementations: `SELECT FOR UPDATE` (pessimistic), row version / `If-Match` headers (optimistic)
