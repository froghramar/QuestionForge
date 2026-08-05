---
id: variant.laravel-service-container.laravel
question: question.laravel-service-container
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Laravel’s service container resolves constructor dependencies and lets applications bind interfaces to implementations. Register application-level bindings in a service provider; use a singleton only when the object is safe to share for the relevant worker lifecycle. Constructor injection keeps dependencies explicit and easily replaceable in tests.

# Why It Matters

Container bindings decouple business logic from infrastructure and keep tests focused.

# Code Example

```php
final class BillingServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(TaxCalculator::class, StandardTaxCalculator::class);
    }
}
```

# Common Mistakes

- **Using global facades for every dependency:** Hidden dependencies make tests and design harder.
- **Making mutable services singletons:** State can leak across long-lived worker requests.

# Follow-up Questions

- **When use a singleton binding?** (Answer: For safe shared objects such as stateless clients.)
- **Where register bindings?** (Answer: In a service provider.)
