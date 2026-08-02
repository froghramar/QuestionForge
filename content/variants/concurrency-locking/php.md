---
id: variant.concurrency-locking.php
question: question.concurrency-locking
technology: tech.php
---
# Expected Answer (PHP 8.5)

Because PHP follows a **Shared Nothing** architecture (each request has its own memory space), concurrency control is usually handled externally:

1.  **Database Locking**: Using `FOR UPDATE` in SQL to acquire a pessimistic lock within a transaction.
2.  **Distributed Locks (Redis)**: Using a library like `redlock-php` to acquire a lock across multiple web servers.
3.  **Advisory Locks**: Database-level locks that aren't tied to rows (e.g., `GET_LOCK()` in MySQL or `pg_advisory_lock()` in PostgreSQL).
4.  **File Locking**: `flock()` can be used for single-server locking but is rarely used in modern cloud environments.

# Why It Matters

Standard PHP code cannot use thread-based locks (like `Mutex` or `synchronized`). If two users try to claim the same username simultaneously, the race condition must be resolved at the storage layer or via a distributed locking service.

# Code Example

```php
// Pessimistic Locking with Eloquent (Laravel)
DB::transaction(function () {
    $account = Account::where('id', 1)->lockForUpdate()->first();
    
    if ($account->balance >= 100) {
        $account->balance -= 100;
        $account->save();
    }
});
```

# Common Mistakes

-   **Race conditions in PHP code**: Attempting to check a condition and then update in two separate, non-atomic steps (e.g., `if ($x) { $db->update(); }`).
-   **Deadlocks**: Acquiring multiple row locks in different orders in separate requests.

# Follow-up Questions

-   **How does Laravel's Atomic Lock work?** (Answer: It uses a cache driver (like Redis or Memcached) to store a key with a TTL (Time-To-Live) to simulate a lock).
-   **Why is 'Shared Nothing' beneficial for scaling?** (Answer: It makes web servers horizontal and stateless, as no state is shared in the application's memory).
---
