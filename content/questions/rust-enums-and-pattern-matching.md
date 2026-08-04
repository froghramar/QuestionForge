---
id: question.rust-enums-and-pattern-matching
title: Enums and Pattern Matching
slug: rust-enums-and-pattern-matching
difficulty: Medium
topic: topic.rust-fundamentals
concepts:
  - concept.rust-enums-patterns
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Enums and exhaustive matching are central to idiomatic Rust modeling. This question tests whether you can represent valid state explicitly and handle every case safely rather than relying on invalid sentinel values or nullable fields.

## Key Concepts

- Enum variants can carry different shapes of associated data.
- `match` arms are checked for exhaustiveness.
- `if let` is concise when handling one pattern and ignoring the rest.
- Pattern matching can destructure structs, tuples, references, and nested enum values.

## Question Variations

- "Why are Rust enums more expressive than C-style enums?"
- "What does exhaustive matching guarantee?"
- "When should you use `if let` rather than `match`?"
- "How does `Option<T>` use enums to model absence?"
