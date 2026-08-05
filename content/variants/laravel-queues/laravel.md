---
id: variant.laravel-queues.laravel
question: question.laravel-queues
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Queue slow or retryable work so HTTP responses are not tied to email, image processing, or third-party latency. Jobs must be idempotent because workers can retry after a timeout or failure. Configure attempts, timeout, and backoff deliberately; make side effects deduplicable. Dispatch work that depends on a database change after commit.

# Why It Matters

Correct job design improves request latency without duplicating payments, emails, or other side effects during retries.

# Code Example

```php
final class SendReceipt implements ShouldQueue
{
    public int $tries = 3;
    public function __construct(public int $orderId) {}
    public function handle(): void { Mail::to('customer@example.test')->send(new ReceiptMail($this->orderId)); }
}
```

# Common Mistakes

- **Assuming a job runs exactly once:** Retries can repeat execution.
- **Putting huge Eloquent graphs in a job payload:** Serialization becomes fragile and stale.

# Follow-up Questions

- **Why use an ID rather than a model graph?** (Answer: Reload current data inside the worker.)
- **What controls retry delay?** (Answer: The job’s backoff configuration.)
