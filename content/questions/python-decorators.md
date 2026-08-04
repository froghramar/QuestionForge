---
id: question.python-decorators
title: Python Decorators
slug: python-decorators
difficulty: Hard
topic: topic.python-fundamentals
concepts:
  - concept.python-decorators
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Decorators bring together first-class functions, closures, argument forwarding, and metadata. This question tests whether you can explain the mechanism and build a decorator that is safe to use in production code.

## Key Concepts

- `@decorator` syntax rebinds a function to the decorator's returned callable.
- Wrapper functions commonly close over the original function.
- `*args` and `**kwargs` preserve a wrapped function's calling flexibility.
- `functools.wraps` preserves useful metadata such as the name and docstring.

## Question Variations

- "How does `@decorator` syntax translate to ordinary Python code?"
- "Why should a decorator use `functools.wraps`?"
- "How do you write a decorator that accepts its own configuration?"
- "What is the difference between a decorator and a context manager?"
