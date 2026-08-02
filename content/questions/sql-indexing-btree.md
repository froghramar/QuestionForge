---
id: question.sql-indexing-btree
title: B-Tree Indexes & SARGability
slug: sql-indexing-btree-sargable
difficulty: Hard
topic: topic.database-fundamentals
estimated_time: 20
updated: 2026-08-01
---

## Why This Is Asked

Indexing is the most impactful database optimization skill. Interviewers want to know if you can explain how indexes work at a structural level, predict when a query will use an index, and identify common patterns that break index usage (non-SARGable queries).

## Key Concepts

- B-Tree is a balanced tree: root and internal nodes contain navigation keys, leaf nodes contain data or row pointers
- Search, insert, and delete are all O(log n) — this is why indexes make reads fast
- SARGable (Search ARGumentable): a query predicate that can leverage an index seek instead of a scan
- Functions on columns (`WHERE YEAR(date) = 2024`), leading wildcards (`LIKE '%foo'`), and implicit type conversions break SARGability
- Composite index key order matters: the "left-prefix rule" means `(A, B, C)` supports queries on `A`, `A,B`, or `A,B,C` — not `B` alone

## Question Variations

- "What is a B-Tree index, and how does it speed up database queries?"
- "What does 'SARGable' mean, and can you give an example of a non-SARGable query?"
- "Explain the importance of column order in a composite (multi-column) index."
- "What is the difference between an 'index seek' and an 'index scan'?"
