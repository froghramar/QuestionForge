---
id: question.python-shallow-vs-deep-copy
title: Shallow vs. Deep Copy
slug: python-shallow-vs-deep-copy
difficulty: Medium
topic: topic.python-fundamentals
concepts:
  - concept.python-copying
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Copying bugs commonly appear when nested configuration, request data, or object graphs are mutated unexpectedly. This question checks whether you can trace object references and choose copying deliberately instead of assuming an assignment creates a new value.

## Key Concepts

- Assignment creates another reference to the same object.
- A shallow copy creates a new outer object but shares nested references.
- `copy.deepcopy` recursively copies nested objects and tracks cycles.
- Immutable values often do not need copying; copying can be costly for large graphs.

## Question Variations

- "What is the difference between `=` and `copy.copy()`?"
- "Why does copying a nested list sometimes still share changes?"
- "When should you avoid `deepcopy`?"
- "How can a class customize its copying behavior?"
