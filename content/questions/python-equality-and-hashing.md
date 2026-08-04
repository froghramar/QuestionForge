---
id: question.python-equality-and-hashing
title: Equality, Identity, and Hashing
slug: python-equality-identity-and-hashing
difficulty: Hard
topic: topic.python-fundamentals
concepts:
  - concept.python-equality-hashing
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

This question checks whether you understand how Python collections determine membership and key lookup. It is important when designing value objects because violating the equality/hash contract causes subtle dictionary and set bugs.

## Key Concepts

- `is` compares object identity; `==` calls value equality through `__eq__`.
- Hash-based collections use hashes to narrow lookup and equality to confirm matches.
- Equal hashable objects must have equal hashes.
- Mutable objects should not change the fields used by their hash while stored in a set or dictionary.

## Question Variations

- "What is the difference between `is` and `==`?"
- "Why does defining `__eq__` affect hashability?"
- "Can a mutable object be a dictionary key?"
- "What must be true for two equal objects' hashes?"
