---
id: variant.spring-boot-containerization.spring-boot
question: question.spring-boot-containerization
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Package a Spring Boot service with layered artifacts or buildpacks so dependency layers can be reused across image builds. Use a minimal runtime image, run as a non-root user, and provide configuration through the platform rather than baking it into the image. Size JVM memory with container limits in mind and connect Actuator readiness and liveness endpoints to orchestrator probes.

# Why It Matters

Good container design improves deployment speed, reduces attack surface, and prevents runtime failures from incorrect configuration or memory assumptions.

# Code Example

```dockerfile
FROM eclipse-temurin:21-jre
RUN useradd --system spring
USER spring
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

# Common Mistakes

- **Running as root:** A compromised application gains unnecessary container privileges.
- **Embedding environment secrets in the image:** They persist in layers and registries.

# Follow-up Questions

- **Why use layered images?** (Answer: Stable dependencies can be cached across application changes.)
- **What should readiness represent?** (Answer: Whether the instance may receive new traffic.)
