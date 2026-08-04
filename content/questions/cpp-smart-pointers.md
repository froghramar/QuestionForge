---
id: question.cpp-smart-pointers
title: Smart Pointer Ownership
slug: cpp-smart-pointer-ownership
difficulty: Hard
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-smart-pointers
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Smart pointers make heap ownership explicit in modern C++. Interviewers use this question to see whether you choose exclusive ownership by default, understand the cost and lifetime model of shared ownership, and prevent reference cycles.

## Key Concepts

- `std::unique_ptr` has one owner and transfers ownership by move.
- `std::shared_ptr` uses a reference-counted control block for shared ownership.
- `std::weak_ptr` observes a `shared_ptr`-managed object without keeping it alive.
- Prefer `std::make_unique` and `std::make_shared` for exception-safe construction.

## Question Variations

- "When should you use `unique_ptr` versus `shared_ptr`?"
- "What problem does `weak_ptr` solve?"
- "Why is `shared_ptr` not a general replacement for ownership design?"
- "How do smart pointers relate to raw non-owning pointers?"
