---
id: variant.sql.clustered-index.postgresql
question: question.sql.clustered-index
technology: tech.postgresql
---
# Expected Answer (PostgreSQL 16)

PostgreSQL uses heap storage; it does not have persistent clustered indexes.

-   **Heap**: Data is unordered on disk.
-   **CLUSTER command**: One-time reordering of a table based on an index.

# Why It Matters

Because PostgreSQL doesn't have a live clustered index, all indexes are essentially non-clustered. This affects how range scans perform and how data is physically managed. PostgreSQL 16 optimizes heap scans and vacuuming to compensate for this architecture.

# SQL Example

```sql
-- Creating an index
CREATE INDEX idx_orders_date ON orders(order_date);

-- Physically reorder the table (One-time operation)
CLUSTER orders USING idx_orders_date;

-- New rows will be inserted as 'heap' (unordered)
INSERT INTO orders (order_date, total) VALUES (now(), 100);
```

# Common Mistakes

- **Assuming Postgres clusters automatically**: It doesn't. If you want a specific order, you must re-run `CLUSTER` manually.
- **Performance expectations**: Expecting range scans to be as fast as SQL Server's clustered index scans without proper indexing.

# Follow-up Questions

- **What is a TID?** (Answer: Physical row pointer in the heap).
- **Does the Primary Key cluster the table?** (Answer: No).
