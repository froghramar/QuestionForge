---
id: question.rust-smart-pointers
title: Smart Pointers and Interior Mutability
slug: rust-smart-pointers-and-interior-mutability
difficulty: Hard
topic: topic.rust-fundamentals
concepts:
  - concept.rust-smart-pointers
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Rust's smart pointers express different ownership and mutation models. This question tests whether you can choose the right pointer for recursive data, shared ownership, single-threaded mutation, and multi-threaded shared state without bypassing safety guarantees.

## Key Concepts

- `Box<T>` owns heap-allocated data with a single owner.
- `Rc<T>` provides non-thread-safe reference-counted shared ownership.
- `Arc<T>` provides thread-safe reference-counted shared ownership.
- `RefCell<T>` checks borrowing at runtime and can panic if its rules are violated.

## Question Variations

- "When would you use `Box`, `Rc`, or `Arc`?"
- "What is interior mutability in Rust?"
- "Why can't `Rc<T>` be sent across threads?"
- "What causes a `RefCell` borrow panic?"
