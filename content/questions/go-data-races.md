---
id: question.go-data-races
title: Data Races and Synchronization
slug: go-data-races-and-synchronization
difficulty: Hard
topic: topic.go-fundamentals
concepts:
  - concept.go-synchronization
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Concurrent code is only useful when it is correct. This question tests whether you can identify a data race, choose an appropriate synchronization mechanism, and use Go's tooling to catch unsafe access before production.

## Key Concepts

- A data race includes concurrent unsynchronized access to the same memory with at least one write.
- `sync.Mutex` protects shared mutable state.
- Channels coordinate ownership and communication between goroutines.
- `go test -race` and `go run -race` instrument programs to detect many races.

## Question Variations

- "What is a data race in Go?"
- "When would you use a mutex rather than a channel?"
- "Does a race-free program automatically avoid deadlocks?"
- "How do you run Go's race detector?"
