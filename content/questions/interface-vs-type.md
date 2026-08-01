---
id: question.interface-vs-type
title: interface vs type
slug: interface-vs-type
difficulty: Easy
topic: topic.type-systems
concepts:
  - concept.structural-typing
estimated_time: 10
updated: 2026-08-01
---

## Why This Is Asked

This is a quick litmus test for TypeScript experience. Interviewers want to see if you know the practical differences — especially declaration merging — and have a reasoned opinion on when to use each, rather than just a default preference.

## Key Concepts

- `interface` supports declaration merging (defining the same interface twice merges them), `type` does not
- `type` can represent unions, intersections, tuples, mapped types, and primitives; `interface` cannot
- Both can describe object shapes and be extended (interface via `extends`, type via `&`)
- `interface` is generally preferred for public API contracts and library definitions (mergeability)
- `type` is preferred for complex type operations, utility types, and union/intersection patterns
