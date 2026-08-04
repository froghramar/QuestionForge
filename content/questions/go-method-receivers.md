---
id: question.go-method-receivers
title: Value vs. Pointer Receivers
slug: go-value-versus-pointer-receivers
difficulty: Hard
topic: topic.go-fundamentals
concepts:
  - concept.go-method-receivers
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Receiver choice determines mutation behavior, copying costs, and interface satisfaction. Interviewers use this question to assess whether you can design reliable APIs around structs, particularly those that contain mutable state or locks.

## Key Concepts

- A value receiver receives a copy of the receiver.
- A pointer receiver can modify the original value.
- Methods with pointer receivers belong to `*T`'s method set, not `T`'s.
- Types containing mutexes or large state should generally use pointer receivers consistently.

## Question Variations

- "When should a Go method use a pointer receiver?"
- "How do receiver choices affect interface implementation?"
- "Can a value call a pointer receiver method?"
- "Why should you avoid copying a struct containing a mutex?"
