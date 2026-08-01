---
id: variant.async-await.dotnet
question: question.async-await
technology: tech.dotnet
---
# Expected Answer

In .NET, `async`/`await` is built on the **Task Parallel Library (TPL)**. An `async` method returns a `Task` or `Task<T>`, and the `await` keyword suspends execution until the awaited task completes — without blocking the calling thread.

The compiler transforms `async` methods into a **state machine**. Each `await` is a suspension point. When the awaited task completes, the continuation is scheduled on the captured `SynchronizationContext` (for UI apps) or the thread pool (for ASP.NET Core).

# Why It Matters

Asynchronous programming is essential for scalability in ASP.NET Core and responsiveness in UI applications (WPF/MAUI). By not blocking threads during I/O operations, a single server can handle thousands of concurrent requests with a relatively small thread pool. Getting this wrong (e.g., "Sync-over-Async") leads to **Thread Pool Starvation** and application deadlocks.

# Example Code

```csharp
public async Task<string> GetDataAsync()
{
    // Thread is released back to the pool during the HTTP call
    var response = await _httpClient.GetStringAsync("https://api.example.com/data");
    
    // Execution resumes here after the I/O completes.
    // In ASP.NET Core, this could be any thread pool thread.
    return response;
}
```

# Common Mistakes

- **Blocking on async code**: Calling `.Result` or `.Wait()` on a task causes deadlocks in environments with a `SynchronizationContext` (like legacy ASP.NET or WPF).
- **Using `async void`**: Except for event handlers, `async void` should be avoided as exceptions crash the process and the caller cannot await completion.
- **Forgetting `ConfigureAwait(false)` in library code**: This can cause deadlocks when the library is consumed by a UI application that has a single-threaded `SynchronizationContext`.

# Follow-up Questions

- **What is the difference between `Task.Run` and `async`/`await`?** (Answer: `Task.Run` offloads CPU-bound work to a thread pool thread; `async`/`await` is for I/O-bound work that frees the thread during waiting).
- **What happens if you `await` an already-completed task?** (Answer: The method continues execution synchronously without suspending or creating a state machine continuation).

# References

- [Microsoft Learn: Asynchronous programming with async and await](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/)
- [Stephen Cleary: Async and Await](https://blog.stephencleary.com/2012/02/async-and-await.html)
