---
id: question.go-goroutines-and-channels
title: Goroutines and Channels
slug: go-goroutines-and-channels
difficulty: Hard
topic: topic.go-fundamentals
concepts:
  - concept.go-goroutines-channels
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Go concurrency is a core part of the language's design. Interviewers use this question to assess whether you can coordinate concurrent work safely, explain channel blocking behavior, and avoid goroutine leaks.

## Key Concepts

- A `go` statement starts a function call in a new goroutine.
- Unbuffered channel sends and receives synchronize; buffered channels allow limited decoupling.
- Closing a channel signals that no more values will be sent.
- Context cancellation and bounded concurrency are essential for long-running services.

## Question Variations

- "What is the difference between a goroutine and an operating-system thread?"
- "When does a channel send block?"
- "Who should close a channel?"
- "How do you prevent a goroutine leak?"
