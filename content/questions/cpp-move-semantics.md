---
id: question.cpp-move-semantics
title: Move Semantics and Rule of Five
slug: cpp-move-semantics-and-rule-of-five
difficulty: Hard
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-move-semantics
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Move semantics are central to writing efficient, resource-safe modern C++. This question assesses whether you understand value categories, ownership transfer, and when custom special member functions are necessary versus when standard RAII types should manage resources for you.

## Key Concepts

- A move constructor or move assignment operation transfers resources from another object.
- `std::move` casts an expression to an xvalue; it does not perform a move by itself.
- A moved-from object remains valid but has an unspecified state.
- Prefer the Rule of Zero; if a type directly owns a resource, consider the Rule of Five.

## Question Variations

- "What does `std::move` actually do?"
- "What is the difference between copying and moving an object?"
- "What are the Rule of Three, Rule of Five, and Rule of Zero?"
- "Can you use an object after moving from it?"
