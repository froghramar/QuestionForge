---
id: question.consistent-hashing-cache-clusters
title: Consistent hashing for cache clusters
slug: consistent-hashing-cache-clusters
difficulty: Hard
topic: topic.distributed-systems
concepts:
  - concept.consistent-hashing
  - concept.distributed-caching
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Distributed caches must route a key to the same node on every request. This question probes how consistent hashing limits cache churn when the node set changes and why virtual nodes, failure handling, and rebalancing strategy matter in a production cluster.

## Key Concepts

- **Ring:** Keys and nodes map to a shared hash space.
- **Minimal remapping:** Membership changes move only a subset of keys.
- **Virtual nodes:** Multiple positions per physical node improve balance.
- **Churn:** A node change still causes misses; it reduces rather than eliminates them.

## Question Variations

- "Why does modulo hashing create a cache miss storm when a node is added?"
- "What are virtual nodes?"
- "How should a client react when its selected cache node is unavailable?"
