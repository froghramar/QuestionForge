---
id: variant.concurrency-locking.system-design
question: question.concurrency-locking
technology: tech.system-design
---
# Expected Answer

### Pessimistic Locking

- **Mechanism**: Locks the data record when a process starts reading it. Other processes must wait for the lock to be released.
- **Implementation**: `SELECT ... FOR UPDATE` in SQL, distributed locks via Redis (`SETNX`) or ZooKeeper.
- **Pros**: Guarantees data integrity — no conflicting writes can occur.
- **Cons**: Reduces throughput; risk of deadlocks when multiple resources are locked in different orders; lock contention under high concurrency.
- **Best for**: High-contention scenarios where conflicts are frequent and expensive (e.g., financial transactions on a single account balance).

### Optimistic Locking

- **Mechanism**: Allows concurrent reads without locking. At write time, checks whether the data has changed since it was read (typically via a version column or ETag).
- **Implementation**:
  ```sql
  UPDATE accounts SET balance = 900, version = 4
  WHERE id = 1 AND version = 3;
  -- If 0 rows affected → conflict detected, retry or fail
  ```
- **Pros**: High throughput; no blocking; no deadlocks.
- **Cons**: Requires conflict resolution logic (retry, merge, or abort); under high contention, the retry rate can degrade performance.
- **Best for**: Low-contention, read-heavy workloads (e.g., editing a document, updating a user profile).

### Decision Framework

| Factor | Pessimistic | Optimistic |
|---|---|---|
| Contention level | High | Low |
| Throughput priority | Lower | Higher |
| Conflict cost | High (worth preventing) | Low (cheap to retry) |
| Deadlock risk | Yes | No |
| Complexity | Lock management | Conflict detection & retry |

# Common Mistakes

- **Defaulting to pessimistic locking "for safety"**: In most web applications, contention is low. Pessimistic locking adds unnecessary latency and deadlock risk.
- **Not handling optimistic locking failures**: Detecting a version conflict but not implementing retry logic or user notification. The conflict detection is only useful if the application acts on it.
- **Holding pessimistic locks during user interaction**: Locking a row while waiting for a user to fill out a form can block other users for minutes, destroying throughput.

# Follow-up Questions

- How would you implement distributed locking across multiple database nodes? (Answer: Use a coordination service like Redis Redlock, ZooKeeper, or etcd. Distributed locks are harder because you need to handle network partitions and lock expiry).
- What is MVCC and how does it relate to optimistic concurrency? (Answer: Multi-Version Concurrency Control maintains multiple versions of a row. Readers see a snapshot at their transaction's start time, and writers check for conflicts at commit. PostgreSQL and Oracle use MVCC internally).
