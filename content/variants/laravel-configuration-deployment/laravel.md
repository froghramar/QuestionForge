---
id: variant.laravel-configuration-deployment.laravel
question: question.laravel-configuration-deployment
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Keep `.env` environment-specific and out of source control. Read environment values in config files, then use `config()` in application code because deployment may cache configuration. Build config and route caches as part of a controlled deploy, and restart long-running queue workers so they load the new code and configuration. Run the web server from Laravel’s `public` directory only.

# Why It Matters

Correct deployment practice prevents leaked secrets, stale workers, and configuration that differs unpredictably by process.

# Code Example

```php
// config/services.php
return ['billing' => ['url' => env('BILLING_URL')]];

// Application code
$url = config('services.billing.url');
```

# Common Mistakes

- **Calling `env()` throughout application code:** Cached configuration can make runtime values unavailable.
- **Forgetting to restart workers after deploy:** Workers retain old code and config.

# Follow-up Questions

- **Why serve only `public/`?** (Answer: It avoids exposing application and configuration files.)
- **Why cache config?** (Answer: It improves bootstrap performance with a fixed deployment configuration.)
