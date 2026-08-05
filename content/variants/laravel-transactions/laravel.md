---
id: variant.laravel-transactions.laravel
question: question.laravel-transactions
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Wrap one atomic business change in `DB::transaction`. If its closure throws, Laravel rolls back; otherwise it commits. Keep that section short and avoid remote calls. Jobs or listeners that need committed data should be dispatched after commit so a worker does not observe a record that later rolls back.

# Why It Matters

Transactions prevent partial writes, while after-commit coordination prevents background work acting on nonexistent state.

# Code Example

```php
DB::transaction(function () use ($order): void {
    $order->update(['status' => 'paid']);
    SendReceipt::dispatch($order->id)->afterCommit();
});
```

# Common Mistakes

- **Calling remote services inside a transaction:** Locks are held while an unreliable dependency waits.
- **Dispatching dependent jobs before commit:** A worker can run before data is visible.

# Follow-up Questions

- **What happens on an exception?** (Answer: The transaction is rolled back.)
- **Why after commit?** (Answer: The job sees only durable data.)
