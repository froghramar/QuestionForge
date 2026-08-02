---
id: variant.task-in-csharp.java
question: question.dotnet-task
technology: tech.java
---
# Expected Answer (Java 26)

The Java equivalent to C#'s `Task` is **`CompletableFuture`** or, in modern Java 21+, a **Virtual Thread**.

1. **`CompletableFuture`**:
   - A promise-based API for asynchronous programming.
   - Supports chaining (`thenApply`), combining (`allOf`), and error handling (`exceptionally`).
   - Similar to a `Task<T>`.
2. **Virtual Threads**:
   - Lightweight threads that allow you to write blocking code that scales like async code.
   - You don't need a `Task` object to represent future work; you just run the work in a virtual thread.

# Why It Matters

While C# moved to `Task` and `async/await`, Java doubled down on making threads cheaper (Virtual Threads). This allows Java developers to avoid the "Function Coloring" problem (async vs sync) while still achieving the same high-scale I/O performance as C#.

# Code Example

```java
// Using CompletableFuture (Reactive style)
CompletableFuture<String> promise = CompletableFuture.supplyAsync(() -> {
    return "Result";
});

promise.thenAccept(System.out::println);

// Using Virtual Threads (Modern style)
Thread.startVirtualThread(() -> {
    String result = fetchData(); // Looks blocking, but yields the carrier thread
    System.out.println(result);
});
```

# Common Mistakes

-   **Using `Future.get()`**: This blocks the current thread until the result is ready, defeating the purpose of asynchrony.
-   **Thread Pool Exhaustion**: Using the default `ForkJoinPool.commonPool()` for long-running blocking I/O tasks.

# Follow-up Questions

-   **What is the difference between `Future` and `CompletableFuture`?** (Answer: `Future` is just a handle; `CompletableFuture` allows for functional chaining and manual completion).
-   **Reactive Streams vs CompletableFuture?** (Answer: CompletableFutures are for single results; Reactive Streams (Project Reactor) are for streams of data).
---
