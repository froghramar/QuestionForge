---
id: variant.async-await.rust
question: question.async-await
technology: tech.rust
---
# Expected Answer (Rust 1.97.1)

An `async fn` returns a future, a value representing work that can make progress when polled. The future is lazy: an executor or runtime must poll it. At an `.await` point where the awaited future is pending, the current future yields so the executor can run another ready task.

The Rust standard library supplies the `Future` abstraction, while runtimes such as Tokio provide an executor and asynchronous I/O integrations. Do not block an async worker with synchronous I/O, `std::thread::sleep`, or long CPU work; use an async operation or move blocking work to an appropriate thread pool.

```rust
async fn fetch_label(id: u32) -> String {
    format!("item-{id}")
}

async fn build_message() -> String {
    let first = fetch_label(1).await;
    let second = fetch_label(2).await;
    format!("{first}, {second}")
}
```

This function needs to be run by an executor; the example intentionally shows only language-level async code and does not choose a runtime.

# Why It Matters

Async Rust can handle many concurrent I/O operations efficiently while preserving memory safety. Correctly separating asynchronous I/O from blocking work prevents latency spikes and executor starvation.

# Common Mistakes

- **Calling an async function without polling or awaiting its future:** The work does not run merely because the future was created.
- **Assuming `async` automatically creates a new thread:** It enables cooperative concurrency; runtime scheduling choices determine threads.
- **Blocking inside an async task:** Other futures sharing that executor worker cannot progress.

# Follow-up Questions

- **Why do async Rust functions often need `Send` futures?** (Answer: Multi-threaded executors may move tasks between worker threads.)
- **What is a common response to CPU-heavy work?** (Answer: Use a dedicated blocking pool or another execution strategy outside the async worker.)
