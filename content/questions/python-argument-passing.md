---
id: question.python-argument-passing
title: Argument Passing and Mutability
slug: python-argument-passing-and-mutability
difficulty: Medium
topic: topic.python-fundamentals
concepts:
  - concept.python-argument-passing
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

This question reveals whether you can accurately predict the effects of a function call on caller-owned data. It avoids misleading labels such as "pass by reference" by focusing on object bindings, rebinding, and mutation.

## Key Concepts

- Function parameters are local names bound to the argument objects.
- Mutating a shared mutable object is visible through other references to it.
- Rebinding a parameter only changes the local name.
- APIs should document whether they mutate supplied collections.

## Question Variations

- "Is Python pass-by-value or pass-by-reference?"
- "Why can a function append to my list but not change my integer?"
- "What is the difference between mutation and rebinding?"
- "How can a function avoid changing a caller's collection?"
