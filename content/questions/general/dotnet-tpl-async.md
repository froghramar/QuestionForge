---
id: question.dotnet-tpl-async
title: Task.WhenAll vs Parallel.ForEach
slug: dotnet-tpl-parallel-vs-async
difficulty: Hard
topic: topic.design-patterns
companies:
  - company.microsoft
  - company.amazon
estimated_time: 20
updated: 2026-08-01
---

## Why This Is Asked

This distinguishes developers who understand the difference between I/O concurrency and CPU parallelism. Interviewers want to see if you can pick the right tool — async for I/O-bound work, parallel for CPU-bound work — and avoid thread pool starvation.

## Key Concepts

- `Task.WhenAll`: I/O concurrency — coordinates multiple async operations, does not necessarily use extra threads
- `Parallel.ForEach`: CPU parallelism — partitions data across threads for compute-heavy work
- `Parallel.ForEachAsync` (.NET 6+): hybrid — async I/O with controlled concurrency via `MaxDegreeOfParallelism`
- Using `Parallel.ForEach` for I/O-bound work blocks threads and leads to thread pool starvation
- Shared state in parallel operations requires thread-safe collections or explicit locking
