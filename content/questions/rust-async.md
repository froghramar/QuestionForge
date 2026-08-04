---
id: question.rust-async
title: Async Futures and Executors
slug: rust-async-futures-and-executors
difficulty: Hard
topic: topic.rust-fundamentals
concepts:
  - concept.rust-async
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Rust async code combines the language's ownership model with cooperative scheduling. Interviewers use it to test whether you understand lazy futures, the executor's role, and why blocking work inside async tasks harms concurrent performance.

## Key Concepts

- Calling an `async fn` returns a future; it does not immediately run its body to completion.
- An executor polls futures and schedules them when they can make progress.
- `.await` waits cooperatively for another future.
- Blocking or CPU-heavy work on an executor worker prevents other tasks on that worker from progressing.

## Question Variations

- "What does an async function return in Rust?"
- "What is the difference between a future and a task?"
- "Why does Rust need an async runtime?"
- "How should CPU-bound work be handled in an async application?"
