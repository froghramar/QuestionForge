---
id: variant.encapsulation-vs-abstraction.java
question: question.encapsulation-vs-abstraction
technology: tech.java
---
# Expected Answer (Java 26)

In Java, these two OOP pillars have distinct roles:

1. **Encapsulation** is about **Data Hiding**. It involves making class fields `private` and providing access through `public` getter and setter methods. It protects the internal state from unauthorized modification.
2. **Abstraction** is about **Complexity Hiding**. It uses `interfaces` and `abstract classes` to define a contract for what a class should do, without specifying how.

# Why It Matters

These principles are the foundation of clean, modular Java code. Encapsulation ensures that an object maintains its validity (e.g., an `Age` field cannot be negative). Abstraction allows you to write code that depends on behaviors (e.g., `List`) rather than specific implementations (e.g., `ArrayList`), making it easy to change implementations later.

# Code Example

```java
// Abstraction: Focus on the 'what'
public interface Shape {
    double area();
}

// Encapsulation: Protect the 'how' and the data
public class Circle implements Shape {
    private double radius; // Hidden data

    public Circle(double radius) {
        if (radius > 0) this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}
```

# Common Mistakes

- **Direct Field Access**: Marking fields as `public` or `protected` when they should be `private`.
- **Returning Mutable Objects**: A getter that returns a reference to a private `List` still allows external modification. Use `Collections.unmodifiableList()`.

# Follow-up Questions

- **How do Records improve encapsulation in Java?** (Answer: Records provide a concise way to create immutable data carriers with built-in private fields and public accessors).
- **Abstract Class vs Interface?** (Answer: Abstract classes can have state and non-public methods; Interfaces are primarily for defining behavior contracts).
