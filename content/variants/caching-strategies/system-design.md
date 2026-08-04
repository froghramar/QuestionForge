---
id: variant.caching-strategies.system-design
question: question.caching-strategies
technology: tech.system-design
---
# Expected Answer

The choice of caching strategy depends on the read/write patterns of your application.

1.  **Cache-Aside** is the most versatile. The app is responsible for reading from and writing to the cache. It’s resilient to cache failures—if the cache is down, the app just goes to the DB.
2.  **Read-Through/Write-Through** shifts the responsibility to the cache provider/library. This keeps the application code cleaner but makes the system more dependent on the cache's availability.
3.  **Write-Behind** is great for write-heavy workloads (like logging or real-time analytics) where you can afford to lose a small amount of data if the cache crashes before it syncs to the DB.

For invalidation, you usually use a **TTL (Time To Live)** for a simple approach, or **explicit invalidation** (purging the key when the DB record is updated) for high consistency.

# Why It Matters

Proper caching can make an application feel instantaneous and reduce database costs by 90%. However, poor caching leads to "stale data" bugs that are notoriously difficult to debug, where a user sees old information even after an update.

# Example Code

```typescript
interface User { id: string; name: string; }

async function getUser(id: string): Promise<User | null> {
  const cachedUser = await cache.get(`user:${id}`);
  if (cachedUser) return JSON.parse(cachedUser) as User;

  const user = await db.users.find(id);

  if (user) {
    await cache.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
  }

  return user;
}
```

# Common Mistakes

- **Caching everything by default:** Caching data that changes constantly (like a real-time stock price) can actually slow the system down due to the overhead of constant cache writes and invalidations.
- **Infinite TTL:** Forgetting to set an expiration time, leading to the cache filling up with data that is never used again.
- **Cache Penetration:** Not caching "null" results. If a user queries for a non-existent ID repeatedly, the app will hit the DB every time. (Solution: Cache the "not found" result for a short time).

# Follow-up Questions

- **What is a "Cache Avalanche"?** (Answer: When many cache keys expire at the same time, or the cache service goes down, causing all traffic to hit the DB at once. Solution: Use random TTL jitters).
- **What is the "Thundering Herd" (or Cache Stampede)?** (Answer: When a very popular key expires and many parallel requests try to regenerate the cache entry simultaneously. Solution: Use locking or pre-warming).
- **Difference between Redis and Memcached?** (Answer: Redis supports complex data structures (lists, sets, hashes), persistence, and pub/sub. Memcached is a simpler, multi-threaded, purely in-memory key-value store).

# References

- [AWS: Caching Strategies](https://aws.amazon.com/caching/best-practices/)
- [Redis Documentation](https://redis.io/docs/)
