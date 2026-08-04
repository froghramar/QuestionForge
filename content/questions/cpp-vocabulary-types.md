---
id: question.cpp-vocabulary-types
title: Optional Variant and Expected
slug: cpp-optional-variant-and-expected
difficulty: Medium
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-vocabulary-types
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Modern C++ APIs can represent common outcomes directly in their types. This question tests whether you distinguish absence from failure and mutually exclusive alternatives, rather than relying on null pointers, sentinel values, or unchecked exceptions for every case.

## Key Concepts

- `std::optional<T>` represents a present `T` or no value.
- `std::variant<Ts...>` holds exactly one alternative from a closed set of types.
- `std::expected<T, E>` represents either a value or a recoverable error.
- Callers should inspect these result types before accessing their payloads.

## Question Variations

- "When should an API return `optional` versus `expected`?"
- "What does `variant` model that inheritance might otherwise model?"
- "Why are sentinel values error-prone?"
- "How do you safely access an alternative in a variant?"
