---
id: variant.dotnet-disposal.java
question: question.dotnet-disposal
technology: tech.java
---
# Expected Answer (Java 26)

In Java, deterministic resource management is handled via the **`AutoCloseable`** interface and the **`try-with-resources`** statement.

1.  **AutoCloseable**: An interface with a single `close()` method.
2.  **try-with-resources**: Automatically calls `close()` on any resource that implements `AutoCloseable` when the block exits.
3.  **Finalizers vs. Cleaners**: Java 9+ deprecated Finalizers in favor of `java.lang.ref.Cleaner`, which provides a safer way to perform cleanup when the GC reclaims an object.

# Why It Matters

The Garbage Collector manages memory, but it does not manage external resources like file handles, database connections, or network sockets. Failing to close these resources leads to "Resource Leaks," which can crash an application or prevent other processes from accessing the OS resources.

# Code Example

```java
// try-with-resources (Automatic Cleanup)
try (var fileStream = new FileInputStream("data.txt");
     var scanner = new Scanner(fileStream)) {
    while (scanner.hasNextLine()) {
        System.out.println(scanner.nextLine());
    }
} catch (IOException e) {
    e.printStackTrace();
}
// Both scanner and fileStream are closed here automatically
```

# Common Mistakes

-   **Manual Closing**: Closing resources in a `finally` block is prone to errors (e.g., if `close()` itself throws an exception, it might suppress the original exception).
-   **Forgetting to implement AutoCloseable**: When creating custom classes that wrap native resources, developers often forget to implement `AutoCloseable`, making it impossible to use them with `try-with-resources`.

# Follow-up Questions

-   **Closeable vs AutoCloseable?** (Answer: `Closeable` is older and restricted to `IOException`; `AutoCloseable` is more general and can throw any `Exception`).
-   **What happens if multiple resources throw exceptions during close?** (Answer: The first exception is thrown, and subsequent exceptions from other `close()` calls are added as "Suppressed Exceptions").
---
