---
id: variant.sealed-classes.java
question: question.sealed-classes
technology: tech.java
---
# Expected Answer (Java 26)

Java introduced **Sealed Classes and Interfaces** (Standard in Java 17, enhanced in subsequent versions) to provide more control over inheritance.

- **Syntax**: `public sealed class Shape permits Circle, Square { }`
- **Keywords**: `sealed`, `non-sealed`, `final`, `permits`.
- **Why use it?**:
    - **Restricted Hierarchy**: You know exactly which classes can extend yours.
    - **Pattern Matching**: The compiler can check if a `switch` expression over a sealed hierarchy is **exhaustive**, removing the need for a `default` case.
    - **Domain Modeling**: Perfect for modeling data that belongs to a fixed set of types (Algebraic Data Types).

# Why It Matters

Sealed classes bridge the gap between "anyone can extend" and "no one can extend" (final). They allow for better encapsulation of a class hierarchy, making the codebase more predictable and enabling powerful compiler-assisted features like pattern matching.

# Code Example

```java
public sealed interface Payment permits CreditCard, PayPal, Crypto {}

public record CreditCard(String number) implements Payment {}
public record PayPal(String email) implements Payment {}
public record Crypto(String wallet) implements Payment {}

public String getProvider(Payment p) {
    return switch (p) {
        case CreditCard c -> "Visa/Mastercard";
        case PayPal pp -> "PayPal Inc.";
        case Crypto cr -> "Blockchain";
        // No default needed! Compiler knows all 'Payment' types.
    };
}
```

# Common Mistakes

- **Omitting `permits`**: If subclasses are in the same file, `permits` is optional. If they are in different files, it is mandatory.
- **Forgetting `non-sealed`**: Subclasses of a sealed class must be either `final`, `sealed`, or `non-sealed` (opening the hierarchy back up).

# Follow-up Questions

- **Can a record be sealed?** (Answer: Records are implicitly `final`, so they cannot be `sealed` themselves, but they can implement a `sealed` interface).
- **Difference between Final and Sealed?** (Answer: Final = 0 subclasses; Sealed = N specific subclasses).
