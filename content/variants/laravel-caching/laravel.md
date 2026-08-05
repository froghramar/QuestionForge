---
id: variant.laravel-caching.laravel
question: question.laravel-caching
technology: tech.laravel
---
# Expected Answer (Laravel 13 / PHP 8.3+)

Use `Cache::remember` for a value that is safe to reuse, with a key that includes its tenant, user, locale, or other scope. Define expiry and invalidation when writes change the underlying data. For replicas, choose a shared store such as Redis when instances need a common cache view. Cache is an optimization, never the authoritative authorization or business-state source.

# Why It Matters

Bad keys leak data between tenants; missing invalidation returns stale results after writes.

# Code Example

```php
$product = Cache::remember("tenant:{$tenantId}:product:{$id}", now()->addMinutes(5),
    fn () => Product::findOrFail($id)
);
```

# Common Mistakes

- **Leaving tenant data out of keys:** One tenant can receive another tenant’s cached result.
- **Assuming expiry alone solves invalidation:** Writes may need immediate eviction.

# Follow-up Questions

- **Why use Redis in a fleet?** (Answer: It provides shared cache state.)
- **What does `remember` do?** (Answer: Reads a key or computes and stores it on a miss.)
