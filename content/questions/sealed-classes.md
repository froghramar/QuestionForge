---
id: question.sealed-classes
title: Sealed Classes
slug: explain-sealed-classes
difficulty: Easy
topic: topic.type-systems
estimated_time: 8
updated: 2026-08-02
---

## Why This Is Asked

Understanding class modifiers like `sealed` is key to robust object-oriented design. Interviewers want to know if you can explain how to prevent inheritance, why you would do it for performance or security, and how it relates to modern language features like records or pattern matching.

## Key Concepts

- A `sealed` class cannot be inherited from.
- It prevents the "Fragile Base Class" problem by stopping others from extending your logic.
- Performance: The compiler can perform "Devirtualization" because it knows no other class will override methods.
- Design: Used for utility classes, security-sensitive logic, or when a class is considered "complete."
