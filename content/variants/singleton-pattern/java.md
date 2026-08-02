---
id: variant.singleton-pattern.java
question: question.singleton-pattern
technology: tech.java
---
# Expected Answer (Java 26)

A Singleton ensures only one instance of a class exists. In Java, there are several ways to implement it:

1. **Enum Singleton**: Recommended by Joshua Bloch (Effective Java) because it is naturally thread-safe and resistant to serialization/reflection attacks.
2. **Double-Checked Locking**: Using the `volatile` keyword to ensure visibility across threads.
3. **Static Inner Class**: Leveraging the JVM's class-loading mechanism for thread-safe, lazy initialization.

# Why It Matters

In Java enterprise development, most singletons are managed by the **Spring IoC Container** (using `@Service` or `@Component`). Understanding the manual implementation is important for core Java tasks or when working outside of a DI framework.

# Code Example

### Enum Singleton (Best Practice)
```java
public enum DatabaseConnection {
    INSTANCE;
    
    public void connect() { /* ... */ }
}
```

### Modern Spring DI
```java
@Service // Default scope is Singleton
public class LoggingService {
    public void log(String msg) { /* ... */ }
}
```

# Common Mistakes

-   **Not using `volatile`**: In double-checked locking, without `volatile`, another thread might see a partially initialized instance.
-   **Reflection Attack**: A manual singleton can be broken via reflection unless the constructor throws an exception if an instance already exists.

# Follow-up Questions

-   **Is a Singleton in Spring the same as a GoF Singleton?** (Answer: No. A GoF Singleton is one per ClassLoader; a Spring Singleton is one per IoC Container).
-   **Why use `Lazy` initialization?** (Answer: To save memory and startup time if the object is expensive to create and might not be used).
