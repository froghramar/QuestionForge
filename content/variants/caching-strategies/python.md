---
id: variant.caching-strategies.python
question: question.caching-strategies
technology: tech.python
---
# Expected Answer (Python)

Python services commonly implement cache-aside with a Redis or Memcached client: deserialize a cached value when present, query the authoritative repository on a miss, then populate a short-lived entry. Treat deserialization failures and cache timeouts as misses, and delete or version the key after a committed source update. The design must make the permissible stale window explicit.

The cache client should use connection pooling and timeouts. Async services should use an async-compatible client rather than blocking the event loop. Protect hot keys with request coalescing, stale serving, or a distributed lock where the extra coordination is justified.

# Why It Matters

Blocking calls or unbounded timeouts can turn a cache issue into stalled Python worker capacity. Clear fallback behavior keeps the database authoritative while the cache reduces normal read load.

# Example Code

```python
async def get_user(user_id: str) -> User:
    key = f"user:{user_id}"
    cached = await redis.get(key)
    if cached is not None:
        return User.model_validate_json(cached)

    user = await repository.find_user(user_id)
    await redis.set(key, user.model_dump_json(), ex=300)
    return user
```

# Common Mistakes

- **Using a synchronous client inside an async request path:** It blocks the event loop and reduces concurrent throughput.
- **Caching an unbounded object without a TTL:** Memory pressure and stale values accumulate.

# Follow-up Questions

- **How should a Python async service handle cache timeouts?** (Answer: Bound the operation and fall back to the source if the endpoint can safely do so.)
- **Why pool cache connections?** (Answer: Creating connections per request adds latency and can exhaust server connection limits.)
