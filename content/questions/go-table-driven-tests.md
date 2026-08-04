---
id: question.go-table-driven-tests
title: Table-Driven Tests
slug: go-table-driven-tests
difficulty: Medium
topic: topic.go-fundamentals
concepts:
  - concept.go-testing
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Go's standard testing package encourages compact, readable tests. This question tests whether you can cover a behavior matrix without duplicated test code and produce failures that identify the case that broke.

## Key Concepts

- Test functions live in `_test.go` files and accept `*testing.T`.
- A table captures named inputs and expected outcomes.
- `t.Run` creates an isolated, named subtest for each case.
- Tests should focus on observable behavior and include error paths and boundaries.

## Question Variations

- "What is a table-driven test in Go?"
- "Why use `t.Run` inside a test loop?"
- "How do you run Go tests with the race detector?"
- "What is the difference between `t.Errorf` and `t.Fatalf`?"
