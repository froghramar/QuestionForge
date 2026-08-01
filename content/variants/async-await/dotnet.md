---
id: variant.async-await.dotnet
question: question.async-await
technology: tech.dotnet
---
# Expected Answer

In .NET, `async`/`await` is built on the **Task Parallel Library (TPL)**. An `async` method returns a `Task` or `Task<T>`, and the `await` keyword suspends execution until the awaited task completes — without blocking the calling thread.

### How It Works

```csharp
public async Task<string> GetDataAsync()
{
    // Thread is released back to the pool during the HTTP call
    var response = await httpClient.GetStringAsync("https://api.example.com/data");
    // Execution resumes here after the I/O completes
    return response;
}
```

The compiler transforms `async` methods into a **state machine**. Each `await` is a suspension point. When the awaited task completes, the continuation is scheduled on the captured `SynchronizationContext` (for UI apps) or the thread pool (for ASP.NET Core).

### Key Details

- **ASP.NET Core has no SynchronizationContext** — continuations run on any thread pool thread, avoiding the deadlocks common in legacy ASP.NET.
- **`ConfigureAwait(false)`**: Skips capturing the synchronization context. Essential in library code to avoid deadlocks and improve performance.
- **`async void`**: Only for event handlers. Exceptions in `async void` crash the process because they can't be observed.

# Common Mistakes

- **Blocking on async code**: Calling `.Result` or `.Wait()` on a task in code with a `SynchronizationContext` causes deadlocks. The continuation needs the context, but the context is blocked waiting for the result.
- **Using `async void` in non-event-handler methods**: Exceptions are unobservable and the caller has no way to await completion.
- **Forgetting `ConfigureAwait(false)` in library code**: Leads to deadlocks when called from UI or legacy ASP.NET contexts.

# Follow-up Questions

- What is the difference between `Task.Run` and `async`/`await`? (Answer: `Task.Run` offloads CPU-bound work to a thread pool thread; `async`/`await` is for I/O-bound work that doesn't need an extra thread).
- What happens if you `await` an already-completed task? (Answer: It completes synchronously — no state machine transition or thread switch occurs).
