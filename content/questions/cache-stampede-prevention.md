---
id: question.cache-stampede-prevention
title: Preventing cache stampedes
slug: cache-stampede-prevention
difficulty: Hard
topic: topic.distributed-systems
concepts:
  - concept.cache-stampede
  - concept.distributed-caching
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

A hot key expiring can turn one database query into thousands of concurrent origin requests. This question tests whether a candidate can protect the origin with request coalescing, distributed coordination, stale-value strategies, jittered expiry, and safe degraded behavior.

## Key Concepts

- **Single-flight:** Coalesce concurrent refreshes in one process.
- **Distributed lock:** Coordinate refresh across multiple instances with a bounded lease.
- **Stale while revalidate:** Serve a known stale value while one request refreshes it.
- **TTL jitter:** Spread expirations so keys do not all refresh at once.

## Question Variations

- "What is the difference between a stampede and a cache avalanche?"
- "How do you prevent a lock holder failure from blocking all requests?"
- "When is serving stale data better than waiting for a refresh?"
