---
id: variant.task-in-csharp.dotnet
question: question.dotnet-task
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

A `Task` in C# represents an asynchronous operation. It is the core of the **Task Parallel Library (TPL)**.

- **Why use it?**: To perform background work or I/O operations without blocking the main thread.
- **Task vs Thread**: A `Thread` is a low-level OS resource. A `Task` is an abstraction that represents "work to be done." Tasks are mapped to threads by the `TaskScheduler`, which uses the `ThreadPool` efficiently.

# Why It Matters

Using `Task` instead of manual `Thread` management allows the .NET runtime to handle thousands of concurrent operations with minimal resource overhead. It is the foundation for `async/await`.

# Code Example

```csharp
// Returning a value asynchronously
public async Task<int> CalculateSumAsync(int a, int b)
{
    return await Task.Run(() => a + b); // Offloads to ThreadPool
}

// Handling multiple tasks
Task task1 = DoWorkAsync();
Task task2 = DoOtherWorkAsync();
await Task.WhenAll(task1, task2);
```

# Common Mistakes

- **Task.Run for I/O**: Using `Task.Run` to wrap a synchronous I/O call. This still blocks a thread. True async I/O (like `ReadFileAsync`) doesn't use a thread while waiting.
- **Fire and Forget**: Calling an async method without `await`. Exceptions will be swallowed, and you won't know when it finishes.

# Follow-up Questions

- **What is `ValueTask`?** (Answer: A struct-based alternative to `Task` that reduces memory allocations when the result is often available synchronously).
- **How do you cancel a Task?** (Answer: By passing a `CancellationToken` to the Task-returning method).
