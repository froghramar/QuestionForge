---
id: question.redis-vs-memcached
title: Redis vs Memcached
slug: redis-vs-memcached
difficulty: Medium
topic: topic.distributed-systems
concepts:
  - concept.redis
  - concept.memcached
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

This tests whether a candidate selects a cache from workload needs instead of popularity. Interviewers expect a comparison of data model, threading, persistence, topology, and operational trade-offs, while recognizing that both products are often used for disposable cache data.

## Key Concepts

- **Redis:** Rich data structures, atomic operations, replication, and optional persistence.
- **Memcached:** Simple opaque key-value cache with multithreaded server execution.
- **Topology:** Redis commonly centralizes richer state; Memcached clients shard keys across independent nodes.
- **Durability:** Neither should become the sole system of record merely because it is fast.

## Question Variations

- "When is Memcached a better choice than Redis?"
- "Can Redis be treated as a durable database?"
- "How does sharding differ between Redis and Memcached?"
