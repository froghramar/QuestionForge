---
id: variant.async-await.javascript
question: question.async-await
technology: tech.javascript
---
# Expected Answer

In JavaScript, `async`/`await` is syntactic sugar over **Promises** and the **event loop**. An `async` function always returns a Promise. The `await` keyword pauses execution of the async function until the Promise settles, then resumes with the resolved value.

Under the hood, the engine uses **microtasks**. When `await` is hit, the function suspends and a microtask is queued. After the current call stack clears and the awaited Promise resolves, the microtask runs the continuation.

# Why It Matters

Asynchronous programming is the backbone of high-performance Node.js and responsive web applications. Without `async/await`, developers were forced into "Callback Hell" or complex Promise chains that were difficult to read and debug. Understanding the event loop and microtask queue is critical for avoiding UI freezes and race conditions.

# Example Code

### Basic Usage

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

### Sequential vs Concurrent

```javascript
// Sequential — second fetch waits for first (slow)
const a = await fetchA();
const b = await fetchB();

// Concurrent — both requests start immediately (fast)
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

# Common Mistakes

- **Sequential awaiting when concurrent is possible**: Writing `await a(); await b();` when the two calls are independent. This doubles the latency unnecessarily.
- **Swallowing errors**: Forgetting `try/catch` or `.catch()` on Promises, leading to unhandled rejections that silently fail or crash the Node.js process.
- **Mixing `await` with `.then()` chains**: Creates hard-to-read code and can introduce subtle ordering bugs.

# Follow-up Questions

- **What is the difference between microtasks and macrotasks?** (Answer: Microtasks (Promises, `queueMicrotask`) run before macrotasks (`setTimeout`, I/O callbacks). The microtask queue is fully drained before the next macrotask runs).
- **How do you limit concurrency when awaiting many Promises?** (Answer: Use `Promise.allSettled` with chunking, or a library like `p-limit` to control the concurrency pool size).

# References

- [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info: Async/await](https://javascript.info/async-await)
