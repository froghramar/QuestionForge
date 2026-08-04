---
id: variant.redis-vs-memcached.redis
question: question.redis-vs-memcached
technology: tech.redis
---
# Expected Answer (Redis 8.8.1)

Redis is a strong choice when the cache needs rich server-side data structures or atomic operations: hashes, sets, sorted sets, streams, counters, expiry, and Lua or functions can reduce application round trips. It also supports replication and persistence options, which can be useful for session state, rate limits, queues, and other volatile-but-important data. These capabilities add operational decisions around memory policy, topology, replication lag, and persistence.

For simple ephemeral blob caching, Redis is not automatically superior. Select it when its semantics solve a concrete need and size memory, eviction, and availability behavior deliberately. Even with persistence enabled, do not casually make Redis the only source of critical data without proving its durability and failover properties meet the required recovery objectives.

# Why It Matters

Using Redis features appropriately can eliminate race conditions and simplify application coordination. Using it as an unexamined database substitute can create data-loss or consistency surprises during failover.

# Example Code

```typescript
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });

export async function allowRequest(userId: string): Promise<boolean> {
  const key = `rate-limit:${userId}`;
  const count = await redis.multi().incr(key).expire(key, 60, 'NX').exec();
  return Number(count[0]) <= 100;
}
```

# Common Mistakes

- **Assuming Redis persistence makes every acknowledged write durable:** Fsync and replication policies determine the remaining loss window.
- **Using an unbounded keyspace:** Redis is memory-bound; missing TTLs and eviction planning can cause memory exhaustion.

# Follow-up Questions

- **Why use a Redis hash instead of many string keys?** (Answer: It can model related fields efficiently and supports atomic field operations.)
- **Does replication guarantee zero data loss?** (Answer: No. Asynchronous replication can lag behind acknowledged writes.)

# References

- [Redis documentation](https://redis.io/docs/latest/)
