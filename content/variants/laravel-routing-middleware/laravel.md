---
id: variant.laravel-routing-middleware.laravel
question: question.laravel-routing-middleware
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Laravel routes match HTTP requests to controllers or closures. Middleware wraps those routes for cross-cutting concerns such as authentication, rate limiting, and request IDs. Group routes with a common prefix and middleware to make an API boundary explicit. Order matters because later middleware depends on earlier parsing, authentication, or bindings.

# Why It Matters

Correct middleware placement prevents unprotected endpoints and keeps policy centralized.

# Code Example

```php
Route::middleware(['auth:sanctum', 'throttle:api'])
    ->prefix('api/v1')
    ->group(function (): void {
        Route::get('/orders', [OrderController::class, 'index']);
    });
```

# Common Mistakes

- **Protecting only individual routes inconsistently:** Sensitive endpoints can be missed.
- **Putting dependent middleware in the wrong order:** Expected request state is unavailable.

# Follow-up Questions

- **Why use a route group?** (Answer: To share middleware and a prefix consistently.)
- **What does middleware do?** (Answer: It processes a request before or after the route handler.)
