---
id: question.rust-send-and-sync
title: Send Sync and Thread Safety
slug: rust-send-sync-and-thread-safety
difficulty: Hard
topic: topic.rust-fundamentals
concepts:
  - concept.rust-send-sync
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Rust's concurrency guarantees come from ownership and its auto traits. This question checks whether you can explain what `Send` and `Sync` mean, understand why certain types are rejected across threads, and compose shared state safely.

## Key Concepts

- `Send` permits transferring ownership of a value to another thread.
- `Sync` permits sharing `&T` between threads safely.
- Most ordinary owned data is automatically `Send` and `Sync` when its fields are.
- `Arc<Mutex<T>>` is a common pattern for shared, mutable state across threads.

## Question Variations

- "What is the difference between `Send` and `Sync`?"
- "Why is `Rc<T>` not `Send`?"
- "Why does `Arc<Mutex<T>>` work across threads?"
- "Should application code implement `Send` or `Sync` manually?"
