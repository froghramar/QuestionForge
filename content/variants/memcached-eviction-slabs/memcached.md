---
id: variant.memcached-eviction-slabs.memcached
question: question.memcached-eviction-slabs
technology: tech.memcached
---
# Expected Answer (Memcached)

Memcached uses slab allocation: memory is divided into slab classes with fixed chunk sizes. An item is assigned to the smallest chunk that can hold it. This avoids general-purpose allocator fragmentation and makes allocation fast, but workloads with changing item-size distributions can leave capacity stranded in one slab class while another class evicts items. A TTL is an upper bound on an item's intended lifetime, not a promise that the key will remain available until then.

Under memory pressure, Memcached evicts items, and applications must treat every lookup as optional. Monitor evictions, hit rate, item-size distribution, and slab utilization; then adjust item design, memory, or slab reassignment based on observed workload. Do not cache values larger than the configured item limit, and avoid making correctness depend on a cache hit.

# Why It Matters

Poor slab utilization can produce unexplained misses even when the server appears to have memory. Cache-aware capacity planning protects the origin and prevents cache loss from becoming an application outage.

# Example Code

```typescript
interface CacheClient {
  get(key: string): Promise<string | null>;
}

export async function loadProduct(cache: CacheClient, id: string): Promise<string> {
  const cached = await cache.get(`product:${id}`);
  return cached ?? loadProductFromDatabase(id);
}
```

# Common Mistakes

- **Assuming TTL prevents eviction:** Memory pressure can evict a live entry before its expiry.
- **Using cached data as the only copy:** Node loss, eviction, or a client rehash makes entries unavailable.

# Follow-up Questions

- **What is slab fragmentation?** (Answer: Capacity is available in the wrong chunk-size class for the objects currently being written.)
- **Why must callers tolerate misses?** (Answer: Memcached intentionally provides best-effort cached data, not durable storage.)

# References

- [Memcached documentation](https://docs.memcached.org/)
