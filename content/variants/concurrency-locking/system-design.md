---
id: variant.concurrency-locking.system-design
question: question.concurrency-locking
technology: tech.system-design
---
# Expected Answer

Concurrency control is managed through two primary strategies:

1.  **Pessimistic Locking**: Locks the record when it is read. Other processes must wait for the lock to be released before they can read or write. It is best for high-contention scenarios (e.g., financial transactions).
2.  **Optimistic Locking**: Allows concurrent reads and only checks for conflicts at write time. It usually uses a version number or timestamp. If the version has changed since it was read, the write fails and the process must retry. It is best for low-contention, read-heavy workloads.

# Why It Matters

Choosing the wrong locking strategy can lead to severe performance issues. Over-using pessimistic locking in a high-traffic web app causes **bottlenecks and deadlocks**, where requests hang waiting for locks. Conversely, failing to handle concurrency in a financial system leads to the **Lost Update** problem, where two users overwrite each other's changes, resulting in incorrect balances or data corruption.

# Example Code

### Optimistic Locking (SQL)

```sql
-- Transaction 1 reads: balance=100, version=5
SELECT balance, version FROM Accounts WHERE id = 1;

-- Transaction 1 attempts update:
UPDATE Accounts 
SET balance = 150, version = 6 
WHERE id = 1 AND version = 5;

-- If 0 rows affected, a conflict occurred. The app should retry.
```

### Pessimistic Locking (SQL)

```sql
BEGIN TRANSACTION;

-- Locks the row until the transaction commits or rolls back
SELECT balance FROM Accounts WHERE id = 1 FOR UPDATE;

UPDATE Accounts SET balance = balance + 50 WHERE id = 1;

COMMIT;
```

# Common Mistakes

- **Defaulting to Pessimistic Locking**: In most distributed systems, contention is low. Pessimistic locks reduce throughput and increase the risk of deadlocks across network partitions.
- **Forgetting Retry Logic**: Optimistic locking only works if the application layer is designed to catch conflict errors and implement a retry strategy (e.g., exponential backoff).
- **Holding locks during I/O or user input**: Keeping a database lock open while waiting for an external API call or a user to click "Submit" will block other users for seconds or even minutes.

# Follow-up Questions

- **How do you implement distributed locking across multiple nodes?** (Answer: Use a coordination service like Redis (Redlock), ZooKeeper, or etcd to manage lock ownership across the cluster).
- **What is MVCC?** (Answer: Multi-Version Concurrency Control allows multiple versions of a row to exist simultaneously, letting readers see a snapshot of the data without being blocked by writers).

# References

- [Designing Data-Intensive Applications (Martin Kleppmann): Concurrency Control](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)
