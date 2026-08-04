---
id: variant.python-asyncio.python
question: question.python-asyncio
technology: tech.python
---
# Expected Answer (Python 3.14)

`asyncio` provides cooperative concurrency, primarily for I/O-bound work. An `async def` call creates a coroutine object. Awaiting it runs it until it waits; creating a task schedules it so the event loop can interleave it with other ready tasks.

Use `asyncio.gather()` when independent operations should run concurrently and their results are all needed. Avoid blocking calls such as `time.sleep()` or a CPU-heavy loop in the event-loop thread; use an asynchronous library, an executor, or another process where appropriate.

```python
import asyncio

async def fetch(label, delay):
    await asyncio.sleep(delay)  # Simulates non-blocking I/O.
    return label

async def main():
    first, second = await asyncio.gather(
        fetch("first", 0.1),
        fetch("second", 0.1),
    )
    assert (first, second) == ("first", "second")

asyncio.run(main())
```

# Why It Matters

Proper asynchronous design lets one process handle many concurrent I/O operations efficiently. Blocking the loop, however, increases latency for every other request or task sharing it.

# Common Mistakes

- **Calling an async function without awaiting or scheduling it:** This creates a coroutine that may never execute.
- **Using synchronous blocking I/O in a coroutine:** It prevents the event loop from running other tasks.
- **Assuming `asyncio` makes CPU work parallel:** It is concurrent on one event-loop thread unless work is moved elsewhere.

# Follow-up Questions

- **What does task cancellation raise at an await point?** (Answer: Usually `asyncio.CancelledError`, which should normally be allowed to propagate after cleanup.)
- **When might a semaphore be useful with `asyncio`?** (Answer: To bound concurrent calls to a rate-limited or resource-constrained service.)
