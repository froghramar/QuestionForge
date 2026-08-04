---
id: question.cpp-object-lifetime
title: Object Lifetime and Dangling References
slug: cpp-object-lifetime-and-dangling-references
difficulty: Hard
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-object-lifetime
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Many difficult C++ bugs come from using an object after its lifetime has ended. This question tests whether you can distinguish ownership from access, recognize temporary and local lifetimes, and design APIs that do not return dangling pointers or references.

## Key Concepts

- A reference or raw pointer does not own an object or extend its lifetime.
- Returning a reference or pointer to a local object creates a dangling result.
- Temporary lifetime extension is limited and should not be relied on indirectly.
- RAII owners such as values and smart pointers make lifetime explicit.

## Question Variations

- "What is a dangling reference in C++?"
- "Why is returning a reference to a local variable undefined behavior?"
- "Do references extend object lifetime?"
- "How can a view type become invalid?"
