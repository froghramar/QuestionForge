---
id: question.go-context-cancellation
title: Contexts and Cancellation
slug: go-contexts-and-cancellation
difficulty: Hard
topic: topic.go-fundamentals
concepts:
  - concept.go-context
estimated_time: 15
updated: 2026-08-04
---

## Why This Is Asked

Go services rely on contexts to stop work when requests time out or clients disconnect. This question tests whether you propagate cancellation correctly, enforce deadlines, and avoid using context as an unstructured parameter bag.

## Key Concepts

- `context.Context` carries deadlines, cancellation, and request-scoped values.
- Derived contexts signal cancellation through `Done()` and report a reason through `Err()`.
- A context should be the first parameter and should not be stored in a long-lived struct.
- Always call a derived context's cancellation function to release associated resources.

## Question Variations

- "Why should a Go function accept `context.Context` as its first parameter?"
- "What is the difference between a timeout and cancellation?"
- "How should a worker respond to `ctx.Done()`?"
- "What kinds of values belong in a context?"
