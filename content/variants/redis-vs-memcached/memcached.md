---
id: variant.redis-vs-memcached.memcached
question: question.redis-vs-memcached
technology: tech.memcached
---
# Expected Answer (Memcached)

Memcached is designed as a simple, disposable in-memory key-value cache. Clients typically hash keys across independent nodes; the server stores opaque values and is multithreaded, making it well suited to straightforward high-throughput cache workloads. It has no native rich collection types, persistence, replication, or server-side coordination semantics, which keeps the model operationally simple.

Choose Memcached when the workload is primarily large-scale ephemeral object caching and the application can tolerate node loss as ordinary cache misses. Choose Redis when the workload needs atomic data structures, richer coordination, replication, or persistence features. Neither choice removes the need for source-of-truth data, TTLs, capacity monitoring, and miss handling.

# Why It Matters

Memcached's simplicity is valuable when cache loss is acceptable. Expecting it to provide durable state, cross-node replication, or Redis-like atomic structures leads to incorrect application designs.

# Example Code

```typescript
import memjs from 'memjs';

const cache = memjs.Client.create(process.env.MEMCACHED_SERVERS);

export async function cacheProfile(id: string, profile: unknown): Promise<void> {
  await cache.set(`profile:${id}`, JSON.stringify(profile), { expires: 300 });
}
```

# Common Mistakes

- **Treating Memcached as durable storage:** Restart or eviction can remove entries at any time; the database must remain authoritative.
- **Assuming one Memcached node knows another node's keys:** Clients distribute keys, so adding or losing nodes changes placement and causes misses.

# Follow-up Questions

- **What happens when a Memcached node fails?** (Answer: Keys mapped to that node miss until the node returns or clients repopulate them.)
- **Why is Memcached good for opaque blobs?** (Answer: Its simple key-value model avoids the overhead of richer server-side structures.)

# References

- [Memcached documentation](https://docs.memcached.org/)
