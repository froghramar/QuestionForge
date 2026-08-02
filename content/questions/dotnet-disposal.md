---
id: question.dotnet-disposal
title: IDisposable & Disposal Pattern
slug: dotnet-idisposable-pattern
difficulty: Medium
topic: topic.design-patterns
concepts:
  - concept.dependency-injection
estimated_time: 20
updated: 2026-08-01
---

## Why This Is Asked

Resource management separates senior .NET developers from juniors. Interviewers want to see that you understand why the GC alone is insufficient for unmanaged resources, and that you can implement the full Dispose pattern correctly including finalizer coordination.

## Key Concepts

- The GC handles managed memory but cannot clean up unmanaged resources (file handles, DB connections, sockets)
- `IDisposable.Dispose()` provides deterministic cleanup — release resources immediately, not "eventually"
- The full pattern involves a `Dispose(bool disposing)` method, a `_disposed` flag, and optional finalizer
- `GC.SuppressFinalize(this)` prevents double-cleanup and avoids promoting the object to a higher GC generation
- `using` statements/declarations guarantee `Dispose()` is called even if an exception is thrown

## Question Variations

- "What is the `IDisposable` interface, and why do we need it in a garbage-collected environment like .NET?"
- "Explain the difference between managed and unmanaged resources."
- "What is the purpose of `GC.SuppressFinalize(this)` in the Dispose pattern?"
- "What is the difference between a `using` statement and a `using` declaration in C# 8.0+?"
