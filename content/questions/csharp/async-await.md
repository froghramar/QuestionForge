---
title: Async vs Await
slug: async-await
difficulty: Medium
category: C#
tags:
  - async
  - task
  - threading
companies:
  - Microsoft
  - Stack Overflow
estimated_time: 10
updated: 2026-07-31
---

# Question

Explain async/await in C#.

---

# Expected Answer

`async` and `await` are keywords in C# used to simplify asynchronous programming. 
They allow you to write code that looks synchronous but executes asynchronously, 
preventing the UI thread from freezing and improving application responsiveness.

---

# Common Mistakes

- Forgetting to use `await` on an async method, which causes the method to return a `Task` instead of the result.
- Using `async void` for anything other than event handlers.
- Blocking on async code using `.Result` or `.Wait()`.

---

# Follow-up Questions

- What is the difference between `Task` and `ValueTask`?
- How does `ConfigureAwait(false)` work?

---

# References

- [Microsoft Docs: Asynchronous programming with async and await](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)
