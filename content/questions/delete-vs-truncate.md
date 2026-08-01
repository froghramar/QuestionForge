---
id: question.sql.delete-vs-truncate
title: DELETE vs TRUNCATE
slug: delete-vs-truncate
difficulty: Easy
topic: topic.database-fundamentals
concepts:
  - concept.sql-indexing
companies:
  - company.amazon
  - company.stripe
estimated_time: 5
updated: 2026-08-01
---

## Why This Is Asked

This question tests the candidate's understanding of DML (Data Manipulation Language) vs DDL (Data Definition Language) and the performance/transactional implications of each.

## Key Concepts

- **DELETE** is DML; **TRUNCATE** is DDL.
- **Logging**: DELETE logs every row removal; TRUNCATE logs only page deallocations.
- **Filters**: DELETE supports a `WHERE` clause; TRUNCATE does not.
- **Identity**: TRUNCATE resets the `IDENTITY` seed; DELETE does not.
- **Triggers**: DELETE fires `AFTER DELETE` triggers; TRUNCATE does not.
