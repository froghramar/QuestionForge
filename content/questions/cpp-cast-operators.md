---
id: question.cpp-cast-operators
title: C++ Cast Operators
slug: cpp-cast-operators
difficulty: Hard
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-casts
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Explicit casts reveal whether a conversion is safe, checked, or a low-level escape hatch. This question tests whether you can use the narrowest correct cast, avoid C-style casts, and recognize when a design should remove the need for a cast altogether.

## Key Concepts

- `static_cast` performs compile-time checked conversions allowed by the type system.
- `dynamic_cast` performs a runtime-checked downcast in a polymorphic hierarchy.
- `const_cast` adds or removes constness but cannot make a truly const object safely mutable.
- `reinterpret_cast` is for low-level representation conversions and requires careful portability and lifetime reasoning.

## Question Variations

- "When should you use `dynamic_cast`?"
- "Why are C-style casts discouraged in modern C++?"
- "What can go wrong with `const_cast`?"
- "Is `reinterpret_cast` a safe way to convert arbitrary objects?"
