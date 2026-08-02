---
id: variant.custom-middleware.php
question: question.custom-middleware
technology: tech.php
---
# Expected Answer (PHP 8.5 / Laravel)

In Laravel, middleware provides a convenient mechanism for inspecting and filtering HTTP requests entering your application.

**Real-time use case**: An "Active Subscription" middleware that checks if a logged-in user has an active paid plan before allowing them to access certain routes.

# Why It Matters

Middleware allows you to centralize logic that applies to many routes. Instead of checking for a subscription in 50 different controller methods, you write it once and apply it to a route group.

# Code Example

```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsSubscribed
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && ! $request->user()->isSubscribed()) {
            return redirect('billing');
        }

        return $next($request);
    }
}
```

# Common Mistakes

-   **Heavy Logic**: Putting complex database queries in middleware that runs on every request can significantly slow down the entire app.
-   **Forgetting `return $next($request)`**: This will break the request, and the user will see a blank page as the controller is never reached.

# Follow-up Questions

-   **Global vs Route Middleware?** (Answer: Global middleware runs on every request; Route middleware is assigned only to specific routes or groups).
-   **What is 'Middleware Terminate'?** (Answer: A method that runs *after* the response has been sent to the browser, useful for logging or cleanup).
---
