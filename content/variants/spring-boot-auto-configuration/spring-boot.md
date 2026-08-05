---
id: variant.spring-boot-auto-configuration.spring-boot
question: question.spring-boot-auto-configuration
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Spring Boot auto-configuration creates infrastructure beans when conditions match the classpath, configuration properties, and beans already defined by the application. Starters bring compatible dependencies, then Boot applies sensible defaults such as an embedded web server or data source. Auto-configuration generally backs off when you define your own bean of the relevant type, letting applications customize a default without replacing every piece of configuration.

# Why It Matters

Understanding conditions prevents accidental duplicate beans and makes startup failures diagnosable instead of mysterious.

# Code Example

```java
@SpringBootApplication
public class Application {
  @Bean
  Clock clock() { return Clock.systemUTC(); }
  public static void main(String[] args) { SpringApplication.run(Application.class, args); }
}
```

# Common Mistakes

- **Treating auto-configuration as magic:** Conditions and application beans determine the result.
- **Overriding a bean without understanding consumers:** Incompatible replacements can break dependent configuration.

# Follow-up Questions

- **How can you inspect auto-configuration conditions?** (Answer: Enable Spring Boot’s condition evaluation report.)
- **What does a starter provide?** (Answer: A curated dependency set and compatible defaults.)
