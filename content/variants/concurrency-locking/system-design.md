---
id: variant.concurrency-locking.system-design
question: question.concurrency-locking
technology: tech.system-design
---
# Expected Answer

### Pessimistic Locking
- **Mechanism:** Locks the data record immediately when the process starts reading it. Other processes must wait for the lock to be released (blocking).
- **Pros:** Guarantees data integrity; prevents any chance of conflict.
- **Cons:** High overhead; leads to deadlocks; significantly reduces throughput in high-concurrency systems.
- **Use Case:** High-contention environments where conflicts are frequent and expensive (e.g., a high-frequency banking transaction on a single account).

### Optimistic Locking
- **Mechanism:** Does not lock data during the read phase. Instead, it captures a version number or timestamp. During the write phase, it checks if the version has changed. If it has, the update fails (usually resulting in a retry).
- **Pros:** No blocking; higher throughput for most web applications; works well across distributed boundaries where holding a persistent lock is impossible.
- **Cons:** "Dirty writes" require retry logic in the application layer; performance degrades if there are frequent collisions.
- **Use Case:** Low-to-medium contention environments (e.g., updating a user profile or editing a wiki page).

# Common Mistakes
- **Deadlock Ignorance:** Implementing pessimistic locks without a strategy for timeouts or deadlock detection.
- **Missing Retries:** Using optimistic locking without implementing a robust retry mechanism in the application code.

# Follow-up Questions
- How does "Select For Update" work in Postgres?
- Can you use ETags as a form of optimistic locking in REST APIs? (Answer: Yes, via `If-Match` headers).
