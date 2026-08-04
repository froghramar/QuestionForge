---
id: question.memcached-eviction-slabs
title: Memcached eviction and slabs
slug: memcached-eviction-slabs
difficulty: Hard
topic: topic.distributed-systems
concepts:
  - concept.memcached
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Memcached capacity failures are often misunderstood as simple LRU behavior. Interviewers use this to test slab allocation, item-size distribution, eviction under memory pressure, and why a cache client must always tolerate misses.

## Key Concepts

- **Slab classes:** Memory is divided into chunks sized for different item ranges.
- **Eviction:** Items are evicted under pressure; a cache hit is never guaranteed.
- **Fragmentation:** One slab class can be short on space while another has unused chunks.
- **Capacity planning:** Measure item sizes, hit rate, evictions, and memory utilization.

## Question Variations

- "Why can Memcached evict a key before its TTL?"
- "What is slab fragmentation?"
- "Why should an application handle a cache miss at every read?"
