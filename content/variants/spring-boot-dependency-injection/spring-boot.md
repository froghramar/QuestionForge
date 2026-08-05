---
id: variant.spring-boot-dependency-injection.spring-boot
question: question.spring-boot-dependency-injection
technology: tech.spring-boot
---
# Expected Answer (Spring Boot 4.1.0 / Java 17+)

Prefer constructor injection for required dependencies. It makes the object valid after construction, supports immutable fields, and permits a plain unit test to provide fakes without Spring. Spring discovers stereotype components or invokes `@Bean` methods to create managed instances. If several beans implement the same interface, use `@Qualifier` for an explicit choice or `@Primary` for a sensible default.

# Why It Matters

Explicit dependencies make component lifecycles, tests, and wiring failures much easier to reason about.

# Code Example

```java
@Service
class InvoiceService {
  private final TaxCalculator taxes;
  InvoiceService(@Qualifier("standardTax") TaxCalculator taxes) { this.taxes = taxes; }
}
```

# Common Mistakes

- **Using field injection:** Dependencies are hidden and tests need reflection or a container.
- **Resolving ambiguity by injecting a random implementation:** Behavior changes as more beans are added.

# Follow-up Questions

- **When use `@Primary`?** (Answer: When one implementation is the normal default.)
- **Why might request scope be needed?** (Answer: For state that must exist once per HTTP request.)
