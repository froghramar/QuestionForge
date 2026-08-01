---
id: variant.sql-indexing-btree.sql
question: question.sql-indexing-btree
technology: tech.sql
---
# Expected Answer

A B-Tree (Balanced Tree) index is the default and most common index type in relational databases. It is a self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time ($O(\log n)$).

The structure consists of:
- **Root Node**: The entry point for searches.
- **Internal Nodes**: Contain "navigation" keys and pointers to the next level down.
- **Leaf Nodes**: The bottom level. In a **Clustered Index**, the leaf nodes contain the actual data rows. In a **Non-Clustered Index**, the leaf nodes contain pointers (RIDs or Clustering Keys) to the actual data.

# Why It Matters

Without indexes, the database must perform a **Full Table Scan**, reading every single row from disk. For a table with millions of rows, this is catastrophic for performance. Indexes allow the engine to find specific rows with only a few I/O operations, which is the difference between a sub-millisecond response and a query that takes minutes.

# SQL Example

### SARGable vs. Non-SARGable Queries

A query is **SARGable** (Search ARGumentable) if the engine can use the index.

```sql
-- NON-SARGABLE: Function on column (Index cannot be used)
SELECT Name FROM Users WHERE YEAR(BirthDate) = 2020;

-- SARGABLE: Range comparison (Index can be used)
SELECT Name FROM Users WHERE BirthDate >= '2020-01-01' AND BirthDate < '2021-01-01';

-- NON-SARGABLE: Leading wildcard
SELECT Name FROM Users WHERE Name LIKE '%Smith';

-- SARGABLE: Trailing wildcard
SELECT Name FROM Users WHERE Name LIKE 'Smith%';
```

# Common Mistakes

- **Indexing everything**: Every index adds overhead to `INSERT`, `UPDATE`, and `DELETE` operations. It also consumes disk space and memory (buffer pool).
- **Ignoring Composite Index Order**: An index on `(LastName, FirstName)` is useless for a query filtering only by `FirstName` (the "Left-Prefix Rule").
- **Over-indexing**: Creating multiple indexes that overlap (e.g., an index on `(A, B)` and another on `(A)`).

# Performance Notes

B-Tree indexes are optimized for systems that read and write large blocks of data. They minimize disk I/O by having a high branching factor (fan-out), meaning the tree is very shallow even for billions of records. 

- **Read Complexity**: $O(\log_b n)$ where $b$ is the branching factor.
- **Write Complexity**: $O(\log_b n)$ plus occasional node splits.

# PostgreSQL Notes

PostgreSQL uses **MVCC** (Multi-Version Concurrency Control), which means updates are effectively a delete and an insert. This can lead to **Index Bloat**. Use `VACUUM` or `REINDEX` to reclaim space. PostgreSQL also supports **BRIN**, **GIN**, and **GiST** indexes for specific data types.

# SQL Server Notes

SQL Server distinguishes strictly between **Clustered Indexes** (table is the index) and **Non-Clustered Indexes**. It also provides **Included Columns**, which allow you to add non-key columns to the leaf level of a non-clustered index to create a "Covering Index" without increasing the size of the navigation tree.

# Follow-up Questions

- **What is a Covering Index?** (Answer: A non-clustered index that contains all columns required by the query, allowing the engine to skip the "Key Lookup" or "RID Lookup" step).
- **What is Index Fragmentation?** (Answer: When the physical order of pages on disk doesn't match the logical order in the index, usually caused by frequent inserts/updates in the middle of the tree).

# References

- [PostgreSQL Documentation: B-Tree Indexes](https://www.postgresql.org/docs/current/indexes-types.html#INDEXES-TYPES-BTREE)
- [SQL Server: Clustered and Nonclustered Indexes Architecture](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide)
