---
id: question.rust-error-handling
title: Results Options and Panics
slug: rust-results-options-and-panics
difficulty: Medium
topic: topic.rust-fundamentals
concepts:
  - concept.rust-errors
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Rust makes failure states visible in types. Interviewers use this question to evaluate whether you can distinguish expected errors from absent values and invariant violations, then propagate useful failures without obscuring context.

## Key Concepts

- `Result<T, E>` represents success or a recoverable error.
- `Option<T>` represents a value that may be absent.
- The `?` operator propagates an error after converting it when needed.
- `panic!` is generally reserved for broken invariants or unrecoverable conditions.

## Question Variations

- "When should an API return `Result` versus `Option`?"
- "What does the `?` operator do?"
- "Why is `unwrap` risky in application code?"
- "When is a panic appropriate in Rust?"
