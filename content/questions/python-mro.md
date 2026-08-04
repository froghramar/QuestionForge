---
id: question.python-mro
title: Method Resolution Order and `super()`
slug: python-method-resolution-order-and-super
difficulty: Hard
topic: topic.python-fundamentals
concepts:
  - concept.python-mro
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

This question tests whether you can reason about Python inheritance beyond a single base class. It is particularly useful for assessing safe framework extension and multiple-inheritance design, where an incorrect direct base-class call can skip behavior or invoke it twice.

## Key Concepts

- The MRO determines where attribute lookup proceeds after a class.
- Python computes the MRO with C3 linearization.
- Zero-argument `super()` follows the MRO rather than naming a direct parent.
- Cooperative multiple inheritance requires each implementation to call `super()` consistently.

## Question Variations

- "How does Python choose a method when multiple base classes implement it?"
- "Why is `super()` preferable to directly calling a parent method?"
- "How can you inspect a class's MRO?"
- "What makes a mixin cooperate safely with other mixins?"
