---
id: variant.sql.delete-vs-truncate.mysql
question: question.sql.delete-vs-truncate
technology: tech.mysql
---
# Expected Answer (MySQL 8.4)

1.  **DELETE**: A DML operation. Rows are deleted one by one. It is transactional and can be rolled back (in InnoDB).
2.  **TRUNCATE**: A DDL operation. It drops and re-creates the table.
    -   **Implicit Commit**: In MySQL, `TRUNCATE` causes an implicit commit. **It cannot be rolled back.**

# Why It Matters

The "Implicit Commit" behavior of `TRUNCATE` in MySQL is a critical safety difference compared to PostgreSQL or SQL Server. If you run `TRUNCATE` inside a transaction block, the transaction is immediately committed and cannot be undone.

# SQL Example

```sql
-- Safe, transactional delete
DELETE FROM session_logs WHERE expiry < NOW();

-- Nuclear option (cannot be rolled back)
TRUNCATE TABLE staging_data;
```

# Common Mistakes

- **Assuming rollback works**: `TRUNCATE` is DDL in MySQL and ends any active transaction.
- **Trigger behavior**: `TRUNCATE` does not fire `ON DELETE` triggers.

# Follow-up Questions

- **What happens to the AUTO_INCREMENT value?** (Answer: `TRUNCATE` resets it to the start).
- **Is TRUNCATE faster?** (Answer: Yes, because it skips the row-by-row deletion and logging).
