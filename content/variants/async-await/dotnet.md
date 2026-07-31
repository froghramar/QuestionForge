---
id: variant.async-await.dotnet
question: question.async-await
technology: tech.dotnet
---

# Expected Answer (.NET)

In .NET, `async` and `await` work by generating a state machine that handles the suspension and resumption of methods...

# Common Mistakes

- Blocking on async code with `.Result` or `.Wait()`.
- Using `async void`.

# Follow-up Questions

- What is the role of `SynchronizationContext`?
