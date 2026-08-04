---
id: question.cpp-containers-and-algorithms
title: Containers and Algorithms
slug: cpp-containers-and-algorithms
difficulty: Medium
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-stl-algorithms
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

The standard library is a major part of idiomatic C++. Interviewers use this question to assess whether you choose data structures by access pattern and use expressive algorithms instead of error-prone hand-written loops where a standard operation already exists.

## Key Concepts

- `std::vector` is a contiguous dynamic array and is often the default sequence container.
- `std::unordered_map` offers average constant-time lookup; `std::map` maintains ordered keys.
- Algorithms accept iterator ranges and work across compatible containers.
- Iterator invalidation depends on the container and operation.

## Question Variations

- "When should you choose `vector`, `list`, or `deque`?"
- "How do `map` and `unordered_map` differ?"
- "Why use `std::find_if` or `std::ranges` algorithms?"
- "What operations invalidate vector iterators?"
