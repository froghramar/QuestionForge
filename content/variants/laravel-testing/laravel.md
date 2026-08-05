---
id: variant.laravel-testing.laravel
question: question.laravel-testing
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Use unit tests for isolated PHP logic and feature tests for observable Laravel behavior such as routes, middleware, validation, policies, and database interactions. Factories create focused model state, while fakes keep queues, events, mail, and external side effects deterministic. Assert HTTP status and body contracts, not merely that a controller was called.

# Why It Matters

Feature tests catch framework wiring problems while isolated tests keep feedback fast.

# Code Example

```php
test('creates a user', function () {
    $this->postJson('/api/users', ['email' => 'ada@example.test'])
        ->assertCreated()
        ->assertJsonPath('email', 'ada@example.test');
});
```

# Common Mistakes

- **Using a full feature test for pure logic:** The suite becomes unnecessarily slow.
- **Allowing real queues or mail in tests:** Side effects make tests flaky and unsafe.

# Follow-up Questions

- **What does `Queue::fake()` provide?** (Answer: It records dispatches without running workers.)
- **When use a feature test?** (Answer: When verifying Laravel HTTP or framework integration behavior.)
