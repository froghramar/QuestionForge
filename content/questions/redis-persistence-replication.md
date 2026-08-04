---
id: question.redis-persistence-replication
title: Redis persistence and replication
slug: redis-persistence-replication
difficulty: Hard
topic: topic.distributed-systems
concepts:
  - concept.redis
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Redis is frequently deployed as if it were both a cache and a durable data store. This question probes whether a candidate understands RDB snapshots, append-only files, asynchronous replication, failover, and the resulting data-loss window.

## Key Concepts

- **RDB:** Point-in-time snapshots with lower write overhead but a larger recovery point objective.
- **AOF:** Append-only durability with configurable fsync trade-offs.
- **Replication:** Usually asynchronous, so acknowledged writes may not yet be on a replica.
- **Failover:** Availability recovery is not the same as zero data loss or linearizable consistency.

## Question Variations

- "What is the difference between RDB and AOF?"
- "Can Redis replication lose acknowledged writes?"
- "How do persistence settings affect latency and recovery?"
