---
id: question.python-context-managers
title: Python Context Managers
slug: python-context-managers
difficulty: Medium
topic: topic.python-fundamentals
concepts:
  - concept.python-context-managers
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Context managers test whether you can write code that releases resources predictably when both success and failure paths occur. They also assess familiarity with a common Python idiom beyond the usual file-opening example.

## Key Concepts

- `with` enters a context manager before the block and exits it afterward.
- `__enter__` and `__exit__` implement the context manager protocol.
- Cleanup occurs even when the block raises an exception.
- `contextlib.contextmanager` creates a context manager from a generator function.

## Question Variations

- "Why should files and locks be used with `with`?"
- "What are `__enter__` and `__exit__` responsible for?"
- "How can `__exit__` suppress an exception?"
- "When would you use `contextlib.contextmanager` instead of a class?"
