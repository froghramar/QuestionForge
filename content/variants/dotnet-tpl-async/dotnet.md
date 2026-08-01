---
id: variant.dotnet-tpl-async.dotnet
question: question.dotnet-tpl-async
technology: tech.dotnet
---
# Expected Answer

.NET provides different mechanisms for handling concurrency depending on whether the task is I/O-bound or CPU-bound:

- **`Task.WhenAll`**: Used for **Asynchronous Concurrency**. It coordinates multiple I/O-bound tasks (e.g., calling three APIs). It is extremely efficient because it doesn't block threads while waiting for results.
- **`Parallel.ForEach`**: Used for **Data Parallelism**. It partitions a collection and processes items in parallel on multiple threads. It is designed for CPU-bound work (e.g., image processing).
- **`Parallel.ForEachAsync` (.NET 6+)**: A hybrid that allows processing a collection asynchronously while controlling the `MaxDegreeOfParallelism`. Ideal for high-volume I/O tasks like sending 10,000 emails in batches of 20.

# Why It Matters

Using the wrong tool can cripple performance. Using `Parallel.ForEach` (CPU-bound) for I/O tasks will block thread pool threads unnecessarily, leading to **Thread Pool Starvation**. Conversely, using `Task.WhenAll` for heavy computation can make the application unresponsive by overwhelming the task scheduler with long-running tasks that don't yield control.

# Example Code

```csharp
// 1. Asynchronous I/O Concurrency
var tasks = urls.Select(url => _httpClient.GetStringAsync(url));
string[] results = await Task.WhenAll(tasks);

// 2. CPU-bound Parallelism
Parallel.ForEach(largeDataset, item => {
    ComputeComplexMath(item);
});

// 3. Rate-limited Asynchronous Processing
await Parallel.ForEachAsync(emails, new ParallelOptions { MaxDegreeOfParallelism = 10 }, 
    async (email, token) => {
        await _emailService.SendAsync(email);
    });
```

# Common Mistakes

- **Blocking in Parallel loops**: Using synchronous I/O inside `Parallel.ForEach`. This locks up multiple threads for the duration of the I/O.
- **Ignoring Thread Safety**: Modifying a shared `List<T>` inside a `Parallel.ForEach` without locking or using `ConcurrentBag<T>`.
- **Overwhelming Downstream Systems**: Using `Task.WhenAll` on 1,000 API calls simultaneously, which can trigger rate limits or exhaust socket connections.

# Follow-up Questions

- **What is "Thread Pool Starvation"?** (Answer: When all threads in the pool are blocked or busy, and new tasks cannot start because there are no available threads).
- **How do you cancel a `Parallel.ForEach` loop?** (Answer: By checking the `ParallelLoopState.Stop()` method or passing a `CancellationToken` in the case of `Parallel.ForEachAsync`).

# References

- [Microsoft Learn: Data Parallelism (Task Parallel Library)](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/data-parallelism-task-parallel-library)
