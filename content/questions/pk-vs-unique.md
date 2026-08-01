---
id: question.sql.pk-vs-unique
title: Primary Key vs Unique Key
slug: pk-vs-unique
difficulty: Beginner
topic: topic.database-fundamentals
concepts:
  - concept.sql-indexing
estimated_time: 5
updated: 2026-08-01
---

## Why This Is Asked

This is a fundamental database design question. It tests whether a candidate understands the basic constraints that ensure data integrity and how they differ in their implementation and usage.

## Key Concepts

- Both enforce uniqueness of values in a column or set of columns.
- **Nullability**: Primary Keys cannot be NULL; Unique Keys can (usually one NULL, but it depends on the DB).
- **Quantity**: One Primary Key per table; multiple Unique Keys allowed.
- **Physical storage**: Primary Key is usually the Clustered Index by default.
