---
id: question.event-processing-guarantees
title: Event Processing Guarantees
slug: event-processing-guarantees
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This tests whether a candidate can distinguish broker delivery guarantees from correct business processing. Interviewers assess duplicate handling, ordering scope, acknowledgements, retries, and the limits of exactly-once claims.

## Key Concepts

- **At-least-once delivery:** A consumer can receive a message more than once after crashes or acknowledgement failures.
- **Idempotent effects:** Processing the same event repeatedly must not change the result after the first successful application.
- **Ordering scope:** Ordering is usually guaranteed only within a partition or key, not across a whole system.
- **Exactly-once boundaries:** Exactly-once broker delivery does not automatically make writes to external systems exactly once.

## Question Variations

- "What is the difference between at-most-once and at-least-once delivery?"
- "How do you deduplicate events without losing legitimate work?"
- "Why does partitioning affect event ordering?"
- "What does exactly-once mean in practice?"
