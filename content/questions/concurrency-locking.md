---
id: question.concurrency-locking
title: Optimistic vs Pessimistic Locking
slug: concurrency-locking-strategies
difficulty: Hard
topic: topic.distributed-systems
concepts:
  - concept.concurrency-control
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

## Question Variations

- "Explain the difference between optimistic and pessimistic locking."
- "When would you prefer optimistic locking over pessimistic locking in a web application?"
- "How do you implement optimistic concurrency control in a database?"
- "What are the risks of using pessimistic locking in a high-traffic environment?"
