---
id: variant.spring-boot-http-clients.spring-boot
question: question.spring-boot-http-clients
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Treat an outbound HTTP call as an unreliable dependency. Set connection and response timeouts, map status and transport failures to a meaningful application error, propagate correlation context, and use bounded retries only for idempotent operations or requests protected by an idempotency key. Do not allow a remote call to wait indefinitely while request threads or connection pools are exhausted.

# Why It Matters

Timeout and retry policy determines whether one degraded dependency becomes a cascading failure.

# Code Example

```java
@Bean
RestClient catalogClient(RestClient.Builder builder) {
  return builder.baseUrl("https://catalog.example").build();
}

Product product(RestClient client, UUID id) {
  return client.get().uri("/products/{id}", id).retrieve().body(Product.class);
}
```

# Common Mistakes

- **Making HTTP calls without timeouts:** Threads and connections can remain occupied indefinitely.
- **Retrying non-idempotent writes blindly:** The downstream operation can be duplicated.

# Follow-up Questions

- **When is retrying a POST safe?** (Answer: When the operation is idempotent or protected with an idempotency key.)
- **Why map downstream errors?** (Answer: To preserve a stable domain/API contract.)
