---
id: variant.global-exception-handling.php
question: question.global-exception-handling
technology: tech.php
---
# Expected Answer (PHP 8.5 / Laravel)

In Laravel, all exceptions are handled by the `App\Exceptions\Handler` class (or in newer versions, via `bootstrap/app.php` configurations).

**Real-time Example**: Catching a `ModelNotFoundException` globally and returning a custom 404 JSON response for API requests, instead of the default HTML error page.

# Why It Matters

Global handling prevents your app from leaking technical details (like database queries or file paths) when an error occurs. It also allows you to integrate with third-party monitoring tools like Sentry or Bugsnag in one place.

# Code Example

```php
// In bootstrap/app.php (Laravel 11+)
->withExceptions(function (Exceptions $exceptions) {
    $exceptions->render(function (NotFoundHttpException $e, Request $request) {
        if ($request->is('api/*')) {
            return response()->json([
                'message' => 'Record not found.'
            ], 404);
        }
    });
})
```

# Common Mistakes

-   **Displaying errors in production**: Having `APP_DEBUG=true` in production is a critical security vulnerability.
-   **Not logging**: Using a global handler to "silence" errors without logging them for developers to fix.

# Follow-up Questions

-   **What is the 'report' method?** (Answer: The method used to log exceptions or send them to external services like Sentry).
-   **What is 'render'?** (Answer: The method responsible for converting an exception into an HTTP response).
---
