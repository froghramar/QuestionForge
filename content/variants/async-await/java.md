---
id: variant.async-await.java
question: question.async-await
technology: tech.java
---
# Expected Answer (Java 26)

While Java does not have the `async` and `await` keywords, it provides powerful alternatives for non-blocking programming.

1.  **CompletableFuture (Java 8+)**: A reactive-style API for chaining asynchronous tasks using `thenApply`, `thenAccept`, and `allOf`.
2.  **Virtual Threads (Project Loom / Java 21/26)**: The modern solution. Instead of non-blocking syntax, Java now supports "Virtual Threads" that are extremely lightweight. You can write simple, blocking-style code, and the JVM automatically yields the underlying carrier thread during I/O.
3.  **Future**: The older, limited interface for representing the result of an asynchronous computation.

# Why It Matters

Java's move toward Virtual Threads represents a shift away from the complexity of reactive programming (`async/await` style). It allows developers to use the standard "thread-per-request" model while achieving the scalability of asynchronous I/O.

# Code Example

```java
// CompletableFuture (Legacy Async/Await style)
CompletableFuture.supplyAsync(() -> fetchData())
    .thenApply(data -> process(data))
    .thenAccept(result -> System.out.println(result));

// Virtual Threads (Java 21/26 approach)
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> {
        var data = fetchData(); // Looks blocking, but is actually non-blocking
        var result = process(data);
        System.out.println(result);
    });
}
```

# Common Mistakes

-   **Blocking Platform Threads**: Calling blocking I/O on a standard thread pool can exhaust the pool.
-   **ThreadLocal with Virtual Threads**: Because virtual threads are cheap, creating millions of them while using large `ThreadLocal` objects can lead to high memory usage.

# Follow-up Questions

-   **What is a Carrier Thread?** (Answer: The physical OS thread that a Virtual Thread is scheduled onto).
-   **Why doesn't Java add async/await?** (Answer: The designers preferred Virtual Threads because they don't require changing existing APIs or splitting the ecosystem into "async" and "sync" functions).
---
