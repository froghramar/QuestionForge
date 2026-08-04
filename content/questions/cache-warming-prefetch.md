---
id: question.cache-warming-prefetch
title: Cache warming and prefetching
slug: cache-warming-prefetch
difficulty: Medium
topic: topic.distributed-systems
concepts:
  - concept.cache-warming
  - concept.distributed-caching
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

This tests whether a candidate can reduce cold-cache latency without merely shifting all read work to startup. Interviewers expect a selective strategy based on likely demand, budgets for source load and memory, and a safe response to deployment or cache-cluster churn.

## Key Concepts

- **Warming:** Pre-populating known hot data before it is requested.
- **Prefetching:** Loading likely future data from an observed request path.
- **Prioritization:** Rank candidates by expected value, not by every available key.
- **Budgeting:** Limit concurrency, time, origin load, and cache memory used by warming.

## Question Variations

- "How would you warm a cache after a deployment?"
- "What are the risks of prefetching every possible next page?"
- "When is lazy cache population preferable to warming?"
