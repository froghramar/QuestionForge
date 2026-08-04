---
id: question.python-generators
title: Generators and `yield`
slug: python-generators-and-yield
difficulty: Medium
topic: topic.python-fundamentals
concepts:
  - concept.python-generators
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Interviewers use generators to assess your understanding of Python's iterator protocol, lazy evaluation, and memory trade-offs. Strong answers distinguish a generator from both a list and a normal function that returns once.

## Key Concepts

- A function containing `yield` returns a generator object when called.
- Values are computed on demand as the generator is advanced.
- A generator is an iterator and is usually exhausted after one pass.
- Lazy processing reduces peak memory use but can defer errors and repeat work.

## Question Variations

- "What changes when a function uses `yield` instead of `return`?"
- "When would you choose a generator over a list?"
- "Why can't you iterate over the same generator twice?"
- "What is the difference between a generator expression and a list comprehension?"
