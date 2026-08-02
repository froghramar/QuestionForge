---
id: variant.concurrency-locking.java
question: question.concurrency-locking
technology: tech.java
---
# Expected Answer (Java 26)

Java provides several mechanisms for concurrency control, ranging from low-level primitives to high-level abstractions in `java.util.concurrent`.

1.  **Pessimistic Locking**:
    *   `synchronized` keyword: Easiest to use, monitor-based locking.
    *   `ReentrantLock`: More flexible, supports timeouts (`tryLock`) and fairness.
2.  **Optimistic Locking**:
    *   `Atomic` classes (e.g., `AtomicInteger`): Use Compare-and-Swap (CAS) instructions.
    *   `StampedLock`: Provides an "optimistic read" mode that doesn't block writers.
3.  **Database Level**: Using JPA `@Version` annotation for optimistic concurrency control.

# Why It Matters

Java is heavily used for high-concurrency systems. Knowing when to use `synchronized` vs `Atomic` vs `ReentrantLock` is critical for building performant, thread-safe applications. Over-locking leads to contention, while under-locking leads to data corruption.

# Code Example

```java
// Optimistic Locking with StampedLock
private final StampedLock lock = new StampedLock();
private int balance;

public int getBalanceOptimistic() {
    long stamp = lock.tryOptimisticRead();
    int currentBalance = balance;
    if (!lock.validate(stamp)) { // Check if a write happened
        stamp = lock.readLock(); // Fallback to pessimistic read
        try {
            currentBalance = balance;
        } finally {
            lock.unlockRead(stamp);
        }
    }
    return currentBalance;
}
```

# Common Mistakes

-   **Lock Contention**: Using a single global lock for a high-traffic resource.
-   **Deadlocks**: Acquiring multiple locks in different orders across different threads.
-   **Forgetting to unlock**: Always use `finally` blocks when using explicit `Lock` objects.

# Follow-up Questions

-   **CAS (Compare-and-Swap)**: How does it work? (Answer: A hardware-level instruction that updates a value only if it matches an expected value, returning success or failure).
-   **Intrinsic vs Extrinsic Locks?** (Answer: Intrinsic locks are built into every Java object (`synchronized`); Extrinsic locks are manual classes like `ReentrantLock`).
