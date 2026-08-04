---
id: question.python-exception-handling
title: Python Exception Handling
slug: python-exception-handling
difficulty: Medium
topic: topic.python-fundamentals
concepts:
  - concept.python-exceptions
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Exception handling exposes how you balance resilience with observability. Interviewers look for targeted error handling, useful error context, and cleanup that does not accidentally hide the original failure.

## Key Concepts

- Catch the narrowest exception type that can be handled meaningfully.
- `else` runs only when the `try` suite succeeds; `finally` runs on every exit path.
- `raise ... from error` preserves causal context when translating exceptions.
- Exceptions should not be used as routine control flow when a clear ordinary branch exists.

## Question Variations

- "When should `else` be used with `try` and `except`?"
- "Why is `except Exception` usually safer than a bare `except`?"
- "How do you wrap a low-level exception without losing its cause?"
- "What belongs in a `finally` block?"
