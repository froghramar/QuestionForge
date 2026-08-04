---
id: question.go-interfaces-and-nil
title: Interfaces and the Nil Trap
slug: go-interfaces-and-nil
difficulty: Hard
topic: topic.go-fundamentals
concepts:
  - concept.go-interfaces
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Go's interfaces are deliberately simple, but their runtime representation creates a frequent source of bugs. This question evaluates whether you understand implicit implementation, method sets, and why an interface can appear non-nil while containing a nil pointer.

## Key Concepts

- Types satisfy interfaces implicitly by implementing the required methods.
- An interface value stores a dynamic type and a dynamic value.
- A nil interface has neither a dynamic type nor a dynamic value.
- An interface containing a typed nil pointer has a type and is therefore non-nil.

## Question Variations

- "How does a Go type implement an interface?"
- "Why can `err != nil` when the returned pointer is nil?"
- "What is the difference between a nil interface and an interface holding a nil pointer?"
- "How do pointer and value receiver method sets affect interface satisfaction?"
