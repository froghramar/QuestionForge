---
id: variant.spring-boot-profiles.spring-boot
question: question.spring-boot-profiles
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Profiles let Spring Boot activate environment-specific properties and beans without putting environment conditionals throughout business code. Use them for legitimate wiring differences, such as a local fake integration, while keeping the application contract stable. The final property value follows Spring Boot’s property-source precedence, so command-line arguments and environment variables can override packaged configuration. Supply production secrets through a secure external source rather than committing them to profile files.

# Why It Matters

Clear profile boundaries prevent accidental production behavior and make deployments reproducible.

# Code Example

```java
@Configuration
@Profile("dev")
class DevelopmentConfig {
  @Bean Clock clock() { return Clock.systemUTC(); }
}
```

# Common Mistakes

- **Using profiles for arbitrary business logic:** Deployment wiring becomes application behavior.
- **Committing production secrets in YAML:** Source history and build artifacts expose them.

# Follow-up Questions

- **What overrides packaged properties?** (Answer: Higher-precedence sources such as environment variables.)
- **Why set test profiles explicitly?** (Answer: To avoid relying on a developer machine’s active configuration.)
