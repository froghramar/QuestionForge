---
id: question.cpp-exception-safety
title: Exception Safety Guarantees
slug: cpp-exception-safety-guarantees
difficulty: Hard
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-exception-safety
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Exception safety distinguishes code that merely compiles from code that maintains resource and state invariants under failure. Interviewers use this topic to assess your use of RAII, transaction-like updates, and `noexcept` boundaries.

## Key Concepts

- The no-throw guarantee means an operation never throws.
- The strong guarantee means an operation either succeeds or has no observable effect.
- The basic guarantee preserves valid invariants and avoids leaks, but state may change.
- RAII releases resources during stack unwinding.

## Question Variations

- "What are the basic and strong exception guarantees?"
- "How does RAII make code exception-safe?"
- "When should a move operation be `noexcept`?"
- "Why should destructors normally not throw?"
