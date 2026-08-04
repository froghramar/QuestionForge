---
id: question.cache-observability-capacity
title: Cache metrics and capacity planning
slug: cache-observability-capacity
difficulty: Hard
topic: topic.distributed-systems
concepts:
  - concept.cache-observability
  - concept.distributed-caching
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

This tests whether a candidate can operate a cache rather than only add one. Interviewers look for metrics tied to user latency and origin protection, a capacity model based on working set and item sizes, and diagnosis beyond a single hit-rate dashboard.

## Key Concepts

- **Hit quality:** Measure hits, misses, cache latency, and avoided origin work.
- **Pressure:** Evictions, memory utilization, item sizes, and connection errors reveal capacity issues.
- **Working set:** Size for the hot data and access distribution, not total database size.
- **SLOs:** Alert on user-facing latency and origin saturation as well as cache internals.

## Question Variations

- "Can a high cache hit rate still indicate a problem?"
- "Which metrics distinguish an undersized cache from an uncacheable workload?"
- "How would you estimate a cache's memory requirement?"
