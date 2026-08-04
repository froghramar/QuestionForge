---
id: variant.cache-invalidation-consistency.system-design
question: question.cache-invalidation-consistency
technology: tech.system-design
---
# Expected Answer (Distributed Caching)

Start by defining the acceptable staleness for each read. In cache-aside, reads check the cache, load the database on a miss, then populate the cache. On a successful source-of-truth update, invalidate or replace the affected cache entries and retain a TTL as a backstop. TTL alone is suitable only when stale reads within its bound are acceptable. For stronger requirements, use explicit invalidation and make the source update and invalidation delivery observable and retryable.

There are races: a reader can miss, load an old value, while a writer updates the source and deletes the key; the reader can then write the old value back. Versioned values, generation keys, compare-and-set operations, or ordered event processing prevent older results from overwriting newer ones. Use an outbox or durable event stream when invalidation must survive application crashes, and ensure cache outages degrade to the source rather than blocking updates.

# Why It Matters

An undefined freshness model produces hard-to-reproduce stale reads after writes. A concrete invalidation protocol makes consistency, latency, and failure trade-offs reviewable.

# Example Code

```typescript
interface CachedValue<T> { version: number; value: T; }

export async function writeIfNewer<T>(key: string, next: CachedValue<T>): Promise<void> {
  const current = await cache.get<CachedValue<T>>(key);
  if (!current || current.version <= next.version) {
    await cache.set(key, next, { ttlSeconds: 300 });
  }
}
```

# Common Mistakes

- **Deleting the cache before the source write commits:** A concurrent reader can repopulate old data, and a failed write leaves unnecessary cache loss.
- **Using TTL as a guarantee of freshness:** It bounds age only after an entry is written and cannot react immediately to updates.

# Follow-up Questions

- **What is a cache generation key?** (Answer: A version included in cache lookup keys so a new generation naturally bypasses older entries.)
- **Why use an outbox for invalidation?** (Answer: It records a source change durably so event publication can be retried after a crash.)

# References

- [Redis caching patterns](https://redis.io/learn/howtos/solutions/caching)
