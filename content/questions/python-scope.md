---
id: question.python-scope
title: LEGB Scope and Closures
slug: python-legb-scope-and-closures
difficulty: Hard
topic: topic.python-fundamentals
concepts:
  - concept.python-scope
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Scope rules underpin callbacks, decorators, configuration, and testability. Interviewers use this question to see whether you can explain name resolution and avoid accidental local variables or late-binding closure bugs.

## Key Concepts

- Python resolves names through local, enclosing, global, then built-in scope.
- Assignment in a function creates a local binding unless declared otherwise.
- `nonlocal` rebinds a name in the nearest enclosing function scope.
- Closures retain access to enclosing bindings, which are looked up when the closure runs.

## Question Variations

- "What does LEGB stand for in Python?"
- "When should you use `global` or `nonlocal`?"
- "Why do callbacks created in a loop sometimes use the final loop value?"
- "How can you bind a loop value when creating a closure?"
