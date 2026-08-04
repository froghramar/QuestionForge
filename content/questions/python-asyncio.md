---
id: question.python-asyncio
title: Asyncio Tasks and Concurrency
slug: python-asyncio-tasks-and-concurrency
difficulty: Hard
topic: topic.python-fundamentals
concepts:
  - concept.python-asyncio
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

`asyncio` is widely used in Python services, clients, and automation. Interviewers use it to test whether you understand cooperative concurrency, task scheduling, cancellation, and the dangers of blocking the event loop.

## Key Concepts

- Calling an `async def` function produces a coroutine object; it does not run it.
- `await` yields control to the event loop until an awaitable can make progress.
- Tasks schedule coroutines to run concurrently on the event loop.
- Blocking CPU or synchronous I/O in a coroutine stalls other tasks on that loop.

## Question Variations

- "What is the difference between a coroutine and an `asyncio.Task`?"
- "When should you use `asyncio.gather`?"
- "Why is `time.sleep()` harmful inside an async function?"
- "How should an asynchronous task respond to cancellation?"
