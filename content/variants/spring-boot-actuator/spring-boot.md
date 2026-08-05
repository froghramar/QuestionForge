---
id: variant.spring-boot-actuator.spring-boot
question: question.spring-boot-actuator
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Spring Boot Actuator provides production endpoints for health, metrics, and application information. Expose only the endpoints operators need and restrict access because environment, health details, and configuration can reveal sensitive information. Use liveness to answer whether the process should be restarted and readiness to answer whether it should receive traffic; make readiness fail while a service is initializing or draining.

# Why It Matters

Actuator makes services observable and deployable, but careless endpoint exposure increases attack surface.

# Code Example

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus
  endpoint:
    health:
      probes:
        enabled: true
```

# Common Mistakes

- **Exposing every management endpoint publicly:** Operational details can leak.
- **Using readiness as a deep unbounded dependency scan:** It can amplify outages.

# Follow-up Questions

- **What does readiness control?** (Answer: Whether an instance should receive traffic.)
- **Why restrict Actuator?** (Answer: Management data can be security-sensitive.)
