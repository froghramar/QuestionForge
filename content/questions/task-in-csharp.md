---
id: question.dotnet-task
title: What is Task in C#?
slug: what-is-task-csharp
difficulty: Medium
topic: topic.async-programming
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

`Task` is the heart of the Task Parallel Library (TPL). Interviewers want to see if you understand that a Task is a promise of future work, how it differs from a low-level Thread, and why it's better for I/O-bound scalability.

## Key Concepts

- A **Task** represents an asynchronous operation.
- It is higher-level than a **Thread** and is managed by the Task Scheduler (using the Thread Pool).
- Tasks support continuation (`ContinueWith`), cancellation (`CancellationToken`), and awaiting.
- Return types: `Task` (void), `Task<T>` (returns value), `ValueTask` (performance optimization).
