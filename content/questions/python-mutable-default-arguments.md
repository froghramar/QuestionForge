---
id: question.python-mutable-default-arguments
title: Mutable Default Arguments
slug: python-mutable-default-arguments
difficulty: Medium
topic: topic.python-fundamentals
concepts:
  - concept.python-mutable-defaults
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

This question tests whether you understand Python's evaluation model rather than only its syntax. It also reveals whether you can spot a subtle source of state leakage in APIs and write a safe alternative.

## Key Concepts

- Default argument expressions are evaluated once, when the `def` statement runs.
- A mutable default object is reused by every call that omits the argument.
- Use `None` as a sentinel and create a new mutable object inside the function.
- Intentional shared defaults are rare and should be made explicit instead.

## Question Variations

- "Why does a list default argument retain values between calls?"
- "How would you safely define an optional list parameter in Python?"
- "Are immutable default arguments affected by this behavior?"
- "When is shared function-level state appropriate?"
