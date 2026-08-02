---
id: question.caching-strategies
title: Caching Strategies
slug: caching-strategies
difficulty: Medium
topic: topic.distributed-systems
concepts:
  - concept.distributed-caching
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

Caching is one of the most effective ways to improve system performance. Interviewers want to know if you understand the trade-offs between different strategies and how you handle the risk of stale data.

## Key Concepts

- **Cache Hit vs. Cache Miss:** Understanding the performance impact.
- **Invalidation:** How to handle data updates.
- **TTL (Time To Live):** Using expiration to manage staleness.
- **Thundering Herd Problem:** What happens when a popular cache key expires simultaneously for many users.

## Question Variations

- "Explain the difference between a 'Cache-Aside' strategy and a 'Write-Through' strategy."
- "What is the 'Thundering Herd' problem in caching, and how can you mitigate it?"
- "How do you decide on the appropriate TTL (Time To Live) for a cached resource?"
- "What are the common strategies for cache invalidation?"
