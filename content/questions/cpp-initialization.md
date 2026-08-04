---
id: question.cpp-initialization
title: Initialization Forms
slug: cpp-initialization-forms
difficulty: Medium
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-initialization
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Initialization syntax changes conversion behavior and overload selection in C++. This question tests whether you can use brace initialization deliberately, avoid accidental narrowing, and recognize cases where braces choose a different constructor than parentheses.

## Key Concepts

- Copy initialization uses `=` and can consider implicit conversions.
- Direct initialization uses parentheses.
- List initialization uses braces and rejects narrowing conversions.
- `std::initializer_list` constructors can take priority during list initialization.

## Question Variations

- "What is the difference between `T x(1)` and `T x{1}`?"
- "Why does brace initialization reject narrowing?"
- "How do initializer-list constructors affect overload resolution?"
- "What is value initialization?"
