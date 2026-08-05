---
id: variant.spring-boot-caching.spring-boot
question: question.spring-boot-caching
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Enable Spring’s caching abstraction, then use `@Cacheable` on a read whose result is safe to reuse with a deliberate key. Pair writes with `@CacheEvict` or another invalidation policy so stale values do not persist indefinitely. The annotations are proxy-based, so a call from one method to another on the same object bypasses interception. In a multi-instance deployment, choose a shared cache if instances must observe a consistent invalidation policy.

# Why It Matters

Caching reduces load only when keys, expiry, and invalidation match the data’s correctness requirements.

# Code Example

```java
@Service
class ProductService {
  @Cacheable(cacheNames = "products", key = "#id")
  Product findById(UUID id) { return load(id); }
  private Product load(UUID id) { return new Product(id); }
}
```

# Common Mistakes

- **Expecting self-invocation to cache:** The proxy is bypassed.
- **Caching mutable data with no invalidation plan:** Clients receive stale or incorrect results.

# Follow-up Questions

- **Why use a shared cache in a fleet?** (Answer: To coordinate cached state across instances.)
- **What does `@CacheEvict` do?** (Answer: Removes entries when mutation makes them stale.)
