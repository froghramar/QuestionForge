---
id: question.cpp-const-correctness
title: Const Correctness
slug: cpp-const-correctness
difficulty: Medium
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-const-correctness
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Const correctness is a core C++ API-design tool. This question tests whether you can express read-only intent, understand how `const` affects member functions and pointer declarations, and avoid weakening type guarantees with unnecessary casts.

## Key Concepts

- A `const` member function cannot modify non-mutable members through `this`.
- Const and non-const overloads can return appropriately qualified references.
- `const T*`, `T* const`, and `const T* const` qualify different parts of a pointer declaration.
- `const` prevents modification through that access path; it does not necessarily mean the underlying object is immutable.

## Question Variations

- "Why should getters usually be marked `const`?"
- "What is the difference between `const int*` and `int* const`?"
- "Can a const object call a non-const member function?"
- "When is `mutable` appropriate?"
