---
id: question.cache-invalidation-consistency
title: Cache invalidation and consistency
slug: cache-invalidation-consistency
difficulty: Hard
topic: topic.distributed-systems
concepts:
  - concept.cache-invalidation
  - concept.distributed-caching
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Caching becomes difficult when the source of truth changes. Interviewers look for a stated consistency target, an update sequence that avoids stale overwrites, and a plan for invalidation delivery failures rather than a blanket claim that TTL solves freshness.

## Key Concepts

- **Cache-aside:** Read from cache, then source on a miss; invalidate after a successful source update.
- **TTL:** Bounds staleness but does not guarantee immediate freshness.
- **Versioning:** Versions or generation keys protect against out-of-order writes.
- **Failure handling:** Invalidation events need retries, observability, and an expiry fallback.

## Question Variations

- "Why does deleting a cache key after a database write still have races?"
- "When is TTL-only invalidation acceptable?"
- "How can versioned cache keys prevent stale overwrites?"
