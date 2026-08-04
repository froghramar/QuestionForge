---
id: variant.caching-strategies.java
question: question.caching-strategies
technology: tech.java
---
# Expected Answer (Java)

In a Java service, cache-aside reads a shared cache first and loads the repository only on a miss. The returned value is then written with a bounded TTL. A successful write to the source of truth should invalidate or version the affected cache entry; never assume the cache is the authoritative copy. Set client timeouts, pool connections, and use metrics to ensure cache failures fall back safely rather than cascading through application threads.

For very hot keys, coordinate regeneration so many request threads do not all query the database after expiry. Framework annotations can reduce boilerplate, but the team still owns key design, invalidation, serialization compatibility, TTL selection, and failure semantics.

# Why It Matters

An incorrectly scoped cache key can leak data between tenants, while synchronous cache stalls can exhaust servlet or worker threads. Treating caching as a resilience design keeps it from becoming a single point of failure.

# Example Code

```java
public User getUser(String id) {
    String key = "user:" + id;
    String cached = redisTemplate.opsForValue().get(key);
    if (cached != null) {
        return objectMapper.readValue(cached, User.class);
    }

    User user = repository.findById(id).orElseThrow();
    redisTemplate.opsForValue().set(key, objectMapper.writeValueAsString(user),
        Duration.ofMinutes(5));
    return user;
}
```

# Common Mistakes

- **Using a key without tenant or authorization context:** A cached response can be returned to the wrong user or tenant.
- **Assuming an annotation solves invalidation automatically:** The update path still needs a correct eviction or versioning policy.

# Follow-up Questions

- **What should cache keys include for multi-tenant data?** (Answer: The tenant identity and any response-shaping authorization or locale dimensions.)
- **Why use a TTL even with explicit eviction?** (Answer: It bounds the impact of missed invalidation events.)
