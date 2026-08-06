---
id: question.cqrs-projection-consistency
title: CQRS Projection Consistency
slug: cqrs-projection-consistency
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This tests whether a candidate can operate eventually consistent read models without misleading users or losing recoverability. Interviewers look for projection lag, read-your-writes options, checkpoints, replay, and idempotent updates.

## Key Concepts

- **Projection lag:** The delay between a write being accepted and its representation appearing in a read model.
- **Read-your-writes:** Pending state, write-model reads, or projection checkpoints can provide a stronger user experience where needed.
- **Checkpoints:** Persisted positions let a projection resume safely and report its freshness.
- **Rebuilds:** A read model must be disposable and reproducible from authoritative state or events.

## Question Variations

- "How do you expose projection freshness to clients?"
- "How would you rebuild a corrupted read model?"
- "How can a user see a just-created order immediately?"
- "What should happen if a projection cannot process an event?"
