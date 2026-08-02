---
id: variant.virtual-vs-override.java
question: question.virtual-vs-override
technology: tech.java
---
# Expected Answer (Java 26)

Java handles method redefinition differently than C#:

- **Virtual by default**: In Java, every non-static, non-private method is **implicitly virtual**. You don't need a `virtual` keyword.
- **`@Override` annotation**: This is not a keyword like in C#, but an annotation. It tells the compiler to check that the method actually exists in the parent class, preventing typos from creating new methods instead of overriding.
- **`final`**: If you want to *prevent* a method from being virtual (disallowing overrides), you mark it as `final`.

# Why It Matters

This default-virtual behavior is a core part of Java's "Late Binding." It ensures that polymorphism works out of the box without requiring explicit opt-in from the base class author.

# Code Example

```java
class Animal {
    void makeSound() { // Implicitly virtual
        System.out.println("Generic Sound");
    }
}

class Dog extends Animal {
    @Override // Optional but highly recommended
    void makeSound() {
        System.out.println("Bark!");
    }
}
```

# Common Mistakes

-   **Assuming static methods are virtual**: Static methods belong to the class, not the instance, and cannot be overridden (they are "hidden").
-   **Omitting `@Override`**: Without it, if you misspell the method name, the code will compile but polymorphism will fail silently at runtime.

# Follow-up Questions

-   **Can you override a constructor?** (Answer: No. Constructors are not inherited).
-   **What is 'Dynamic Method Dispatch'?** (Answer: The process where the JVM decides at runtime which overridden method to call based on the actual object type).
