---
id: variant.ts-discriminated-unions.java
question: question.ts-unions-exhaustive
technology: tech.java
---
# Expected Answer (Java 26)

In modern Java, Discriminated Unions are implemented using **Sealed Classes** (or Interfaces) combined with **Records** and **Pattern Matching**.

1.  **Sealed Classes**: Restrict which classes can extend or implement them.
2.  **Records**: Provide a concise way to define immutable data carriers.
3.  **Pattern Matching for switch**: Allows the compiler to check for exhaustiveness.

# Why It Matters

Before Java 17, modeling "One of these several things" required complex Visitor patterns or instance-of chains. Sealed classes allow the JVM and compiler to understand the complete set of possible subtypes, enabling safer and more expressive domain modeling.

# Code Example

```java
public sealed interface Shape permits Circle, Square, Rectangle {}

public record Circle(double radius) implements Shape {}
public record Square(double side) implements Shape {}
public record Rectangle(double w, double h) implements Shape {}

public double calculateArea(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Square s -> s.side() * s.side();
        case Rectangle r -> r.w() * r.h();
        // No 'default' needed if all permitted types are covered!
    };
}
```

# Common Mistakes

-   **Using 'default' in switch**: If you include a `default` case, you lose the exhaustiveness check. If a new permitted subclass is added later, the compiler won't warn you that it's unhandled.
-   **Open hierarchies**: Using standard interfaces instead of `sealed` prevents the compiler from performing exhaustiveness checks.

# Follow-up Questions

-   **Sealed vs Final?** (Answer: `final` allows ZERO subclasses; `sealed` allows a SPECIFIC list of subclasses).
-   **Permits Clause**: When can it be omitted? (Answer: When the subclasses are defined in the same file as the sealed class).
---
