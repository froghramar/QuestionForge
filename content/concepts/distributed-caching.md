---
id: concept.distributed-caching
title: Distributed Caching
slug: distributed-caching
topic: topic.distributed-systems
description: Using a shared cache to improve performance and scalability in distributed systems.
---
# Distributed Caching

In a distributed system, a distributed cache is a shared memory system used to store frequently accessed data, reducing the need to query the primary data store (usually a database).

## Why Use a Cache?
- **Performance:** Caches are typically in-memory (like Redis or Memcached), offering sub-millisecond latency.
- **Scalability:** Offloads read pressure from the database, allowing the system to handle more concurrent users.
- **Availability:** Can provide a fallback for data if the primary database is temporarily slow or unavailable.

## Caching Strategies
1.  **Cache-Aside (Lazy Loading):** The application checks the cache first. If it's a "miss," it queries the DB, stores the result in the cache, and returns it. (Most common).
2.  **Read-Through:** The application asks the cache for data. If missing, the cache itself queries the DB and updates itself before returning to the app.
3.  **Write-Through:** Data is written to the cache and the DB simultaneously. Ensures consistency but adds write latency.
4.  **Write-Behind (Write-Back):** Data is written only to the cache. The cache later asynchronously updates the DB. (Fastest, but risk of data loss).

## Eviction Policies
When the cache is full, it must decide what to delete:
- **LRU (Least Recently Used):** Discards the least recently accessed items first. (Most common).
- **LFU (Least Frequently Used):** Discards items that are used the least often.
- **FIFO (First In, First Out):** Discards the oldest items.

## The Challenge: Cache Invalidation
"There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton.
Ensuring the cache reflects the current state of the database is the hardest part of caching.
