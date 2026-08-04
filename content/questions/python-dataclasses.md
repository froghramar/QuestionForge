---
id: question.python-dataclasses
title: Python Dataclasses
slug: python-dataclasses
difficulty: Medium
topic: topic.python-fundamentals
concepts:
  - concept.python-dataclasses
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Dataclasses are a standard way to model data in modern Python. This question tests whether you know what they generate, when their defaults are safe, and when a regular class or a validation-focused model is a better fit.

## Key Concepts

- `@dataclass` can generate `__init__`, `__repr__`, and equality methods.
- `field(default_factory=...)` creates a fresh mutable value per instance.
- `frozen=True` makes attribute reassignment disallowed and can support value-object design.
- Dataclasses reduce boilerplate but do not automatically validate external input.

## Question Variations

- "Which methods does `@dataclass` generate by default?"
- "How do you give a dataclass list field a safe default?"
- "What does `frozen=True` guarantee and not guarantee?"
- "When would you choose a regular class instead?"
