---
id: variant.spring-boot-observability.spring-boot
question: question.spring-boot-observability
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Use metrics for aggregate numerical signals, traces for a request’s causal path across services, and structured logs for detailed events. Spring Boot integrates Micrometer with metrics registries and observability tooling, but instrumentation needs safe cardinality: use bounded tags such as endpoint and status class, never an unbounded user ID or request ID. Propagate trace or correlation information across outbound calls and include it in logs to connect an alert to a failing request.

# Why It Matters

Observable services reduce incident time-to-diagnosis without turning the monitoring system into a costly data store of unbounded labels.

# Code Example

```java
@Component
class OrderMetrics {
  OrderMetrics(MeterRegistry registry) {
    Counter.builder("orders.created").tag("channel", "api").register(registry);
  }
}
```

# Common Mistakes

- **Using user IDs as metric tags:** Cardinality grows without bound.
- **Relying only on logs:** Aggregate trends and cross-service causality remain difficult to see.

# Follow-up Questions

- **What is a high-cardinality tag?** (Answer: A label with many or unbounded distinct values.)
- **Why propagate trace context?** (Answer: It connects related operations across service boundaries.)
