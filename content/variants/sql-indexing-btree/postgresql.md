---
id: variant.sql-indexing-btree.postgresql
question: question.sql-indexing-btree
technology: tech.postgresql
---
# Expected Answer (PostgreSQL 16)

PostgreSQL B-Tree indexes are the default and support deduplication (since PG 13).

-   **Index-Only Scans**: Possible when using `INCLUDE` or if all columns are in the index.
-   **Partial Indexes**: Indexing only a subset of rows.

# Why It Matters

Indexing is the primary tool for performance. PostgreSQL 16 improves vacuuming and index maintenance, reducing the "bloat" that naturally occurs in MVCC systems. Understanding how Postgres handles B-Trees is vital for scaling high-traffic databases.

# SQL Example

```sql
-- Creating a B-Tree index
CREATE INDEX idx_user_email ON users(email);

-- Partial Index (Very efficient for status flags)
CREATE INDEX idx_active_users ON users(id) WHERE is_active = true;

-- Covering Index using INCLUDE
CREATE INDEX idx_orders_customer_covering ON orders(customer_id) INCLUDE (total_amount);
```

# Common Mistakes

- **Index Bloat**: Forgetting that every `UPDATE` in Postgres is a `DELETE` + `INSERT`.
- **Ignoring Deduplication**: Not realizing that Postgres can significantly shrink index size for columns with many duplicate values.

# Follow-up Questions

- **What are Partial Indexes?** (Answer: Indexes with a `WHERE` clause).
- **Difference between B-Tree and GIN?** (Answer: B-Tree is for scalar comparison; GIN is for composite data like JSONB).
