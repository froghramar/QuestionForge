---
id: concept.sql-indexing
title: SQL Indexing
slug: sql-indexing
topic: topic.database-fundamentals
description: The mechanism of using auxiliary data structures to speed up data retrieval in relational databases.
---

SQL Indexing is a way to optimize the performance of a database by reducing the amount of disk I/O required to find specific rows. Similar to an index in a book, a database index allows the engine to jump directly to the relevant data without scanning the entire table.

### Key Types
- **B-Tree**: The default for most relational databases.
- **Hash**: Used for exact matches, often in-memory.
- **Bitmap**: Used for columns with low cardinality (few unique values).
- **GIN/GiST**: Used for complex data types like JSONB or full-text search.
