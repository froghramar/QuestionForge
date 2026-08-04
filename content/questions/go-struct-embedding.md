---
id: question.go-struct-embedding
title: Struct Embedding and Composition
slug: go-struct-embedding-and-composition
difficulty: Medium
topic: topic.go-fundamentals
concepts:
  - concept.go-embedding
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Embedding is often mistaken for conventional object-oriented inheritance. This question checks whether you can compose types safely, understand method promotion, and avoid leaking an embedded type's API where explicit delegation is clearer.

## Key Concepts

- An embedded field is declared by type rather than by a field name.
- Fields and methods of the embedded value can be promoted to the outer type.
- Go favors composition and explicit interfaces over inheritance hierarchies.
- Name conflicts and method shadowing require an explicit selector.

## Question Variations

- "Is struct embedding inheritance in Go?"
- "What does it mean for a method to be promoted?"
- "How does embedding a pointer differ from embedding a value?"
- "What happens when two embedded types expose the same method name?"
