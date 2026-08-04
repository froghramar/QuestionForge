---
id: question.rust-iterators
title: Iterators and Ownership
slug: rust-iterators-and-ownership
difficulty: Medium
topic: topic.rust-fundamentals
concepts:
  - concept.rust-iterators
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Iterator pipelines are pervasive in Rust, and their ownership behavior affects both correctness and ergonomics. This question checks whether you know that adapters are lazy and can choose between consuming, immutable, and mutable iteration.

## Key Concepts

- Iterator adapters such as `map` and `filter` are lazy.
- A consumer such as `collect` or `sum` drives the iterator.
- `iter`, `iter_mut`, and `into_iter` borrow immutably, borrow mutably, or consume collection elements respectively.
- Closures can capture surrounding values by borrow or move.

## Question Variations

- "Why does `map` not run until an iterator is consumed?"
- "What is the difference between `iter()`, `iter_mut()`, and `into_iter()`?"
- "When does an iterator pipeline allocate?"
- "How does `collect` know which collection to build?"
