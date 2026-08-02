---
id: variant.sql.delete-vs-truncate.postgresql
question: question.sql.delete-vs-truncate
technology: tech.postgresql
---
# Expected Answer (PostgreSQL 16)

`DELETE` is a DML operation; `TRUNCATE` is a DDL operation. Both are fully transactional in PostgreSQL.

1.  **Logging**: `DELETE` logs rows; `TRUNCATE` logs page deallocations.
2.  **FKs**: `TRUNCATE` requires `CASCADE` if FKs exist.

# Why It Matters

Using `DELETE` on millions of rows can cause transaction log bloat and performance lag. `TRUNCATE` is the efficient way to clear tables, and PostgreSQL's ability to roll back a `TRUNCATE` makes it safer than in many other RDBMS.

# SQL Example

```sql
-- Selective Delete
DELETE FROM audit_logs WHERE created_at < '2023-01-01';

-- Full Table Clear (Transactional)
BEGIN;
TRUNCATE TABLE staging_data RESTART IDENTITY;
COMMIT;
```

# Common Mistakes

- **Assuming TRUNCATE isn't transactional**: It is in Postgres!
- **Identity Reset**: `TRUNCATE` does not reset sequences by default in Postgres unless `RESTART IDENTITY` is specified.

# Follow-up Questions

- **Does TRUNCATE fire triggers?** (Answer: Only statement-level truncate triggers).
- **Can you filter a TRUNCATE?** (Answer: No).
