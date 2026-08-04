---
id: question.go-slices
title: Slices and Backing Arrays
slug: go-slices-and-backing-arrays
difficulty: Hard
topic: topic.go-fundamentals
concepts:
  - concept.go-slices
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Slices are used throughout Go, yet their shared storage creates surprising mutation and memory-retention bugs. This question tests whether you can reason about length, capacity, `append`, and copying rather than treating a slice as an independent dynamic array.

## Key Concepts

- A slice has a pointer, length, and capacity; it is not the array itself.
- Slicing and assigning slices can share the same backing array.
- `append` reuses capacity when possible and may allocate a new array when it is exhausted.
- `copy` copies elements into a destination slice and is useful for ownership boundaries.

## Question Variations

- "Why can modifying one slice change another slice?"
- "When does `append` allocate a new backing array?"
- "What is the difference between a nil slice and an empty slice?"
- "How do you make an independent copy of a slice?"
