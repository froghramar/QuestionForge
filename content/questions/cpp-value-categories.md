---
id: question.cpp-value-categories
title: Value Categories and Forwarding
slug: cpp-value-categories-and-forwarding
difficulty: Expert
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-value-categories
estimated_time: 20
updated: 2026-08-04
---

## Why This Is Asked

Value categories explain overload selection, move semantics, and generic wrapper design. Interviewers use this question to assess whether you can distinguish an rvalue reference from an rvalue and use `std::forward` correctly without moving from an argument unintentionally.

## Key Concepts

- Lvalues have persistent identity; rvalues are commonly temporary or expiring values.
- `T&&` is an rvalue reference in an ordinary declaration.
- In a deduced context, `T&&` can be a forwarding reference.
- A named rvalue-reference variable is an lvalue expression.

## Question Variations

- "What is the difference between an rvalue and an rvalue reference?"
- "Why is a named `T&&` variable an lvalue?"
- "What does `std::forward` do that `std::move` does not?"
- "When should a function use a forwarding reference?"
