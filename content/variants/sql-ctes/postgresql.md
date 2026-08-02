---
id: variant.sql.ctes.postgresql
question: question.sql.ctes
technology: tech.postgresql
---
# Expected Answer (PostgreSQL 16)

PostgreSQL supports standard, recursive, and writable CTEs.

-   **Recursive**: `WITH RECURSIVE` for hierarchy.
-   **Writable**: `INSERT/UPDATE/DELETE` inside a CTE.

# Why It Matters

CTEs improve readability and allow for complex multi-step data transformations in a single statement. PostgreSQL 16's optimization of CTE materialization makes them as fast as subqueries while remaining much more maintainable.

# SQL Example

```sql
-- Writable CTE: Move deleted rows to an archive table
WITH deleted_rows AS (
    DELETE FROM tasks 
    WHERE status = 'done' 
    RETURNING *
)
INSERT INTO task_archive
SELECT * FROM deleted_rows;
```

# Common Mistakes

- **Infinite Loops**: Forgetting a termination condition in `WITH RECURSIVE`.
- **Materialization Overhead**: In older versions, CTEs were always materialized. In PG 16, this is mostly automatic.

# Follow-up Questions

- **Can you update data with a CTE?** (Answer: Yes, in PostgreSQL).
- **How to prevent infinite loops?** (Answer: Use `UNION` instead of `UNION ALL` or a depth counter).
