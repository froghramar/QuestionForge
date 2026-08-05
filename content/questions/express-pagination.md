---
id: question.express-pagination
title: Express API Pagination
slug: express-api-pagination
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Collection endpoints need predictable performance and stable client behavior as data grows. Interviewers use pagination to test database-aware API design and validation of query-controlled workload.

## Key Concepts

- Enforce a bounded page size and validate query parameters.
- Offset pagination is simple but can degrade for deep pages and shift during writes.
- Cursor pagination needs a deterministic, indexed ordering.
- Response metadata should let clients continue without exposing internal implementation details.

## Question Variations

- "When would you choose cursor pagination over offset pagination?"
- "Why must a cursor include a stable sort order?"
- "How should an API enforce maximum page size?"
