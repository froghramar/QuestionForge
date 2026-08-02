---
id: variant.singleton-pattern.php
question: question.singleton-pattern
technology: tech.php
---
# Expected Answer (PHP 8.5)

A Singleton in PHP ensures a class is instantiated only once per request. 

**Why use it?**: For objects that represent shared resources, like a Database connection (`PDO`) or a Configuration manager.

# Why It Matters

In modern PHP, the "Manual Singleton" (private constructor + static instance) is often considered an anti-pattern. Instead, we use the **Laravel/Symfony Service Container** to manage singletons. This makes the code easier to test because the container can swap the singleton for a mock during testing.

# Code Example

### Manual Implementation (Traditional)
```php
class Database
{
    private static ?Database $instance = null;
    private function __construct() {} // Private

    public static function getInstance(): Database
    {
        return self::$instance ??= new self();
    }
}
```

### Modern Container Implementation (Laravel)
```php
// In a Service Provider
$this->app->singleton(Connection::class, function ($app) {
    return new Connection(config('db.dsn'));
});
```

# Common Mistakes

-   **Expecting persistence across requests**: PHP is "Shared Nothing." A singleton only lasts for the duration of one HTTP request.
-   **Static state in tests**: Manual singletons are hard to reset in unit tests, leading to "leaky" tests where one test affects the results of another.

# Follow-up Questions

-   **What is the 'Dependency Injection Container'?** (Answer: A tool for managing class dependencies and performing dependency injection).
-   **Singleton vs Static Class?** (Answer: A singleton can be instantiated (once) and can implement interfaces; a static class cannot).
---
