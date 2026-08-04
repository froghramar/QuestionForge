---
id: variant.async-await.cpp
question: question.async-await
technology: tech.cpp
---
# Expected Answer (C++23)

C++ coroutines are a language facility for suspending and resuming a function. `co_await` awaits an awaitable, `co_yield` produces a yielded value, and `co_return` completes the coroutine. Unlike JavaScript or C#, the standard language feature does not provide a built-in executor, task type, or asynchronous I/O runtime; a library defines the coroutine return type and scheduling behavior.

Calling a coroutine commonly creates a lazy task object. Work proceeds only when the task is resumed or scheduled by the chosen library. Avoid blocking executor threads with synchronous I/O or CPU-heavy work, and ensure cancellation and lifetime behavior are part of the task API.

```cpp
// Illustrative coroutine type supplied by an async library.
task<int> fetch_total() {
    const int first = co_await fetch_value(1);
    const int second = co_await fetch_value(2);
    co_return first + second;
}
```

The exact `task` and `fetch_value` APIs depend on the selected coroutine library or application framework.

# Why It Matters

Coroutines can express high-concurrency I/O flows without deeply nested callbacks. Understanding the separation between language syntax and runtime scheduling prevents incorrect assumptions about threads, execution, and cancellation.

# Common Mistakes

- **Assuming `co_await` supplies an async runtime:** C++ provides coroutine syntax; a library supplies task types and scheduling.
- **Treating coroutine creation as guaranteed execution:** Many task types are lazy until explicitly awaited or scheduled.
- **Capturing references across suspension without lifetime guarantees:** Referenced objects may be destroyed before the coroutine resumes.

# Follow-up Questions

- **What does `co_return` do?** (Answer: It completes the coroutine and supplies its result through the coroutine promise.)
- **Why should a coroutine task API define cancellation?** (Answer: The language does not prescribe cancellation semantics or resource cleanup policy.)
