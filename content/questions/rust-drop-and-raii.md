---
id: question.rust-drop-and-raii
title: Drop and RAII
slug: rust-drop-and-raii
difficulty: Medium
topic: topic.rust-fundamentals
concepts:
  - concept.rust-drop
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Deterministic cleanup is a major benefit of Rust ownership. Interviewers use this topic to see whether you understand resource lifetime, destruction order, and why APIs should model cleanup through ownership instead of relying on callers to remember manual release calls.

## Key Concepts

- Values are dropped when their owner leaves scope.
- Fields are dropped after a type's `Drop::drop` method returns.
- Local values are dropped in reverse order of creation.
- `std::mem::drop` releases a value early; calling `Drop::drop` directly is prohibited.

## Question Variations

- "When does Rust call `Drop`?"
- "What is RAII and how does Rust use it?"
- "Can you call a type's `drop` method directly?"
- "How do you release a lock or file before the end of a scope?"
