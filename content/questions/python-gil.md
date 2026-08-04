---
id: question.python-gil
title: Python's Global Interpreter Lock
slug: python-global-interpreter-lock
difficulty: Hard
topic: topic.python-fundamentals
concepts:
  - concept.python-gil
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

The GIL question checks whether you can make sensible concurrency choices in CPython rather than assuming threads always improve throughput. A strong answer separates CPU-bound and I/O-bound workloads and recognizes that the interpreter implementation matters.

## Key Concepts

- In standard CPython builds, one thread executes Python bytecode at a time per process.
- Threads remain useful for I/O-bound work because blocking I/O can release the GIL.
- Multiple processes can use multiple CPU cores for CPU-bound workloads.
- Native extensions may release the GIL while running non-Python work.

## Question Variations

- "Does the GIL prevent Python from using multiple CPU cores?"
- "When would you use threads, processes, or `asyncio` in Python?"
- "Why can threaded I/O still be effective in CPython?"
- "Is the GIL part of the Python language specification?"
