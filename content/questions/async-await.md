---
id: question.async-await
title: async/await
slug: async-await
difficulty: Medium
topic: topic.async-programming
concepts:
  - concept.asynchrony
companies:
  - company.microsoft
  - company.google
  - company.amazon
estimated_time: 10
updated: 2026-08-01
---

## Why This Is Asked

Interviewers use this to gauge whether you understand asynchronous programming beyond syntax — specifically how the runtime schedules work, what happens to the thread during an `await`, and whether you can reason about concurrency pitfalls.

## Key Concepts

- `async`/`await` is syntactic sugar over Promises (JS) or Tasks (.NET), not a threading mechanism
- The `await` keyword yields control back to the caller and resumes after the awaited operation completes
- Does not create new threads — it frees the current thread to do other work during I/O
- Error handling via try/catch wraps rejected promises or faulted tasks
- Sequential vs concurrent awaiting (`await a; await b` vs `await Promise.all([a, b])`)
