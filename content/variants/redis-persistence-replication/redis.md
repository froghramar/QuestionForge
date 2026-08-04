---
id: variant.redis-persistence-replication.redis
question: question.redis-persistence-replication
technology: tech.redis
---
# Expected Answer (Redis 8.8.1)

Redis offers RDB snapshots and append-only file (AOF) persistence. RDB captures point-in-time snapshots, which is compact and efficient but can lose writes since the last snapshot after a crash. AOF records write operations; its fsync policy trades durability for latency and throughput. A hybrid configuration can combine faster startup snapshots with more recent AOF history, but the recovery objective still depends on the configured persistence cadence and storage reliability.

Replication primarily improves read scaling and failover availability. It is normally asynchronous, so a primary can acknowledge a write before replicas receive it. If the primary fails before replication, failover can lose acknowledged writes. Settings that require replica acknowledgements reduce that window at the cost of availability or write latency, but they do not transform Redis into a universally linearizable database. State the required RPO and RTO, then test actual failover behavior.

# Why It Matters

Treating replication as a durability guarantee leads to painful data loss during failover. Matching Redis persistence and topology to explicit recovery requirements prevents a cache optimization from becoming an unplanned data store.

# Example Code

```typescript
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });

export async function writeSession(id: string, value: string): Promise<void> {
  await redis.set(`session:${id}`, value, { EX: 900 });
  const replicas = await redis.wait(1, 100);
  if (replicas < 1) throw new Error('Write was not replicated in time');
}
```

# Common Mistakes

- **Equating a replica acknowledgement with permanent durability:** Acknowledgement reduces risk but storage and failover configuration still matter.
- **Enabling AOF without deciding an fsync policy:** The default policy determines the crash-loss window and write-latency impact.

# Follow-up Questions

- **When might RDB be sufficient?** (Answer: When data is reconstructable and a snapshot-sized loss window is acceptable.)
- **What does asynchronous replication imply?** (Answer: A newly acknowledged primary write might not exist on the promoted replica after failover.)

# References

- [Redis persistence documentation](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)
