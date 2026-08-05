---
id: variant.spring-boot-configuration-properties.spring-boot
question: question.spring-boot-configuration-properties
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Use `@ConfigurationProperties` to bind a coherent, namespaced configuration contract to a typed object. It is preferable to scattered `@Value` fields because it groups related settings, supports metadata, and can be validated at startup. Keep configuration externalized per environment and inject secrets through a managed mechanism rather than source code.

# Why It Matters

Typed validated configuration turns deployment mistakes into deterministic startup failures rather than production behavior surprises.

# Code Example

```java
@ConfigurationProperties("app.mail")
@Validated
public record MailProperties(@NotBlank String host, @Min(1) int port) {}

@SpringBootApplication
@ConfigurationPropertiesScan
public class Application { }
```

# Common Mistakes

- **Putting secrets in committed YAML:** They leak through source control and logs.
- **Using unrelated `@Value` fields everywhere:** Configuration contracts become hard to validate and discover.

# Follow-up Questions

- **When does validation happen?** (Answer: During property binding at application startup.)
- **Why use profiles?** (Answer: To vary non-secret configuration by environment.)
