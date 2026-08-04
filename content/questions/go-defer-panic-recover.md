---
id: question.go-defer-panic-recover
title: Defer Panic and Recover
slug: go-defer-panic-and-recover
difficulty: Hard
topic: topic.go-fundamentals
concepts:
  - concept.go-defer-panic-recover
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

This topic tests whether you can distinguish ordinary error handling from exceptional failure and reliably clean up resources. It also exposes misconceptions about defer timing and the limited scope in which a panic can be recovered.

## Key Concepts

- Deferred calls run when the surrounding function returns, in last-in-first-out order.
- Arguments to a deferred call are evaluated when `defer` executes.
- A panic unwinds the current goroutine's stack while running deferred calls.
- `recover` only works when directly invoked by a deferred function in the panicking goroutine.

## Question Variations

- "When do deferred calls run, and in what order?"
- "Should a Go API use panic for expected failures?"
- "Why does `recover` not catch a panic from another goroutine?"
- "What value does a deferred closure observe?"
