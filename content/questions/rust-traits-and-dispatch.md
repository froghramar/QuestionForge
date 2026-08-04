---
id: question.rust-traits-and-dispatch
title: Traits and Dispatch
slug: rust-traits-and-dispatch
difficulty: Hard
topic: topic.rust-fundamentals
concepts:
  - concept.rust-traits
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Traits are Rust's primary abstraction mechanism. This question tests whether you can express shared behavior, choose between generic and dynamic polymorphism, and understand the performance and flexibility trade-offs.

## Key Concepts

- A trait declares required or default behavior that types can implement.
- Generic bounds such as `T: Trait` are normally monomorphized with static dispatch.
- Trait objects such as `&dyn Trait` use dynamic dispatch through a vtable.
- Object safety determines whether a trait can be used as a trait object.

## Question Variations

- "How do traits compare with interfaces in other languages?"
- "What is the difference between `impl Trait` and `dyn Trait`?"
- "When should you use static versus dynamic dispatch?"
- "What makes a trait object-safe?"
