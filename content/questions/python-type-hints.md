---
id: question.python-type-hints
title: Python Type Hints
slug: python-type-hints
difficulty: Medium
topic: topic.python-fundamentals
concepts:
  - concept.python-type-hints
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Type hints are central to maintainable Python codebases. Interviewers use this topic to assess how you design clear interfaces, use static analysis, and avoid confusing optional, union, generic, and protocol types.

## Key Concepts

- Annotations describe intended types but are not generally runtime validation.
- Static checkers such as mypy and pyright analyze annotated code.
- Built-in generics express container element types, such as `list[str]`.
- `Protocol` can specify structural interfaces without requiring inheritance.

## Question Variations

- "Are Python type hints enforced at runtime?"
- "How do `Optional[T]` and `T | None` relate?"
- "When would you use a `Protocol`?"
- "What is the difference between `Any` and `object`?"
