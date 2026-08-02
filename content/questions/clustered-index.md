---
id: question.sql.clustered-index
title: Clustered Index
slug: clustered-index
difficulty: Medium
topic: topic.database-fundamentals
concepts:
  - concept.sql-indexing
estimated_time: 10
updated: 2026-08-01
---

## Why This Is Asked

Understanding clustered indexes is fundamental to database performance tuning. It tests whether a candidate knows how data is physically stored on disk and how that choice impacts every single query against the table.

## Key Concepts

- A clustered index determines the physical order of data in a table.
- A table can have only **one** clustered index because rows can only be sorted in one order.
- The leaf level of a clustered index contains the actual data rows.
- Choosing an ever-increasing key (like `IDENTITY` or `SEQUENCE`) prevents page splits.

## Question Variations

- "What is a clustered index, and how does it differ from a non-clustered index?"
- "Why can a table have only one clustered index?"
- "What happens to the physical data when you create or rebuild a clustered index?"
- "How does the choice of a clustered index key affect the performance of inserts?"
