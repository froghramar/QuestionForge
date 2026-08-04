---
id: variant.caching-strategies.go
question: question.caching-strategies
technology: tech.go
---
# Expected Answer (Go)

In Go services, cache-aside is a practical default: read the cache, load the authoritative store on a miss, and populate the cache with a bounded TTL. The cache must remain optional—timeouts, serialization errors, and misses should fall back to the source when the endpoint can tolerate it. On a successful update, invalidate the affected key or write a versioned replacement; TTL is a backstop, not immediate consistency.

Use context deadlines on cache operations and emit metrics for hit rate, error rate, latency, and origin fallbacks. For hot keys, add request coalescing or a distributed coordination strategy so a miss does not produce a burst of identical database queries.

# Why It Matters

Without deadlines and fallback behavior, a cache outage becomes an application outage. Without invalidation or stampede control, the cache can serve stale data or overload the database exactly when it is under pressure.

# Example Code

```go
func GetUser(ctx context.Context, id string) (User, error) {
    key := "user:" + id
    if value, err := rdb.Get(ctx, key).Result(); err == nil {
        var user User
        if json.Unmarshal([]byte(value), &user) == nil {
            return user, nil
        }
    }

    user, err := repository.FindUser(ctx, id)
    if err != nil {
        return User{}, err
    }
    encoded, _ := json.Marshal(user)
    _ = rdb.Set(ctx, key, encoded, 5*time.Minute).Err()
    return user, nil
}
```

# Common Mistakes

- **Failing the request on every cache error:** A cache should usually degrade to the source rather than becoming a hard dependency.
- **Omitting a context deadline:** Slow cache connections can consume all request capacity.

# Follow-up Questions

- **How would you coalesce concurrent misses in Go?** (Answer: Use a per-key singleflight group, and coordinate across instances when needed.)
- **Why ignore a cache-set failure after a successful source read?** (Answer: The source result is still valid; caching is an optimization.)
