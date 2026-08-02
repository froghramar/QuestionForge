---
id: variant.closures.java
question: question.closures
technology: tech.java
---
# Expected Answer (Java 26)

In Java, closures are implemented via **Lambda Expressions** and **Anonymous Inner Classes**. 

1.  **Lexical Scoping**: A lambda can access variables from its surrounding block.
2.  **Effectively Final**: In Java, a closure can only capture local variables that are `final` or "effectively final" (not modified after initialization).
3.  **Functional Interfaces**: Lambdas are mapped to interfaces with a single abstract method (SAM), such as `Predicate`, `Function`, or `Consumer`.

# Why It Matters

Java's closure implementation is unique because it forces developers to be explicit about state changes. The "effectively final" rule prevents race conditions where multiple threads might attempt to modify the same local variable within a closure.

# Code Example

```java
int limit = 10;
// 'limit' is effectively final
List<Integer> numbers = List.of(1, 5, 12, 8);
List<Integer> filtered = numbers.stream()
    .filter(n -> n > limit) // Closure capturing 'limit'
    .collect(Collectors.toList());

// limit = 20; // This would break the closure above!
```

# Common Mistakes

-   **Modifying captured variables**: Attempting to change a local variable used inside a lambda will result in a compilation error.
-   **Confusion with 'this'**: Inside a lambda, `this` refers to the enclosing class instance, whereas in an anonymous inner class, it refers to the anonymous class itself.

# Follow-up Questions

-   **Why must captured variables be effectively final?** (Answer: To avoid synchronization issues, as the local variable is on the stack while the closure might execute on a different thread later).
-   **Method References**: How do they relate to lambdas? (Answer: Syntactic sugar for lambdas that just call an existing method).
---
