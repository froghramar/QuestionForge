---
id: variant.dotnet-tpl-async.dotnet
question: question.dotnet-tpl-async
technology: tech.dotnet
---
# Expected Answer

### `Task.WhenAll` (Asynchronous Concurrency)
- **Nature:** I/O-bound.
- **Mechanism:** It coordinates multiple asynchronous tasks. It does not necessarily use more threads; it utilizes the `await` mechanism to release the thread while waiting for I/O (network, disk, DB).
- **Use Case:** Calling 5 different Microservices in parallel and waiting for all results.

### `Parallel.ForEach` (Data Parallelism)
- **Nature:** CPU-bound.
- **Mechanism:** It partitions a collection and processes the parts in parallel on multiple threads. It is designed to maximize CPU usage.
- **Use Case:** Performing heavy mathematical calculations or image processing on a large collection of items.

### `Parallel.ForEachAsync` (.NET 6+)
This is the hybrid. It allows you to process a collection asynchronously while controlling the `MaxDegreeOfParallelism`. This is ideal when you have a large list of I/O tasks but don't want to overwhelm the target system (e.g., sending 10,000 emails, but only 20 at a time).

# Common Mistakes
- **Mixing I/O and Parallel:** Using `Parallel.ForEach` for I/O-bound tasks. This will block many threads and lead to thread pool starvation.
- **Thread Safety:** Forgetting that `Parallel.ForEach` requires thread-safe collections (like `ConcurrentDictionary`) or locking when updating shared state.

# Follow-up Questions
- What is "Thread Pool Starvation"?
- How do you cancel a `Parallel.ForEach` loop? (Answer: Via `ParallelLoopState.Stop()` or a `CancellationToken`).
