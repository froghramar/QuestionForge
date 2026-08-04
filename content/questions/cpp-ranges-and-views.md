---
id: question.cpp-ranges-and-views
title: Ranges and Views
slug: cpp-ranges-and-views
difficulty: Medium
topic: topic.cpp-fundamentals
concepts:
  - concept.cpp-ranges
estimated_time: 10
updated: 2026-08-04
---

## Why This Is Asked

Ranges modernize C++ sequence processing with composable operations and safer end handling. This question assesses whether you understand lazy views, ownership, and when a pipeline must be materialized into an owning container.

## Key Concepts

- A range represents a sequence that can be iterated.
- Views adapt ranges lazily and generally do not own their elements.
- Pipelines combine view adaptors with `|`.
- A view is valid only while its underlying data remains valid.

## Question Variations

- "What is the difference between a view and a container?"
- "Are C++ views evaluated lazily?"
- "When should a range pipeline be materialized?"
- "What lifetime concerns apply to `std::string_view` and range views?"
