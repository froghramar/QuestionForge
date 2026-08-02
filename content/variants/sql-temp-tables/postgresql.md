---
id: variant.sql.temp-tables.postgresql
question: question.sql.temp-tables
technology: tech.postgresql
---
# Expected Answer (PostgreSQL 16)

PostgreSQL uses a different model for temporary tables compared to SQL Server.

1.  **TEMPORARY Tables**:
    -   Syntax: `CREATE TEMP TABLE table_name (...)`
    -   Scope: Visible only to the current session.
    -   Lifetime: Dropped at the end of the session.
    -   Transaction Behavior: Can be dropped at the end of a transaction using `ON COMMIT DROP`.

# Why It Matters

PostgreSQL does not have "Global" temporary tables in the same way SQL Server does (##Table). Instead, you would typically use a regular table in a specific schema or a Materialized View if persistence across sessions is needed. PostgreSQL 16 continues to optimize how temporary files are handled during large sorts or joins.

# SQL Syntax

```sql
-- Basic Temp Table
CREATE TEMP TABLE temp_orders (
    id int,
    total numeric
);

-- Transaction-scoped Temp Table (Dropped after COMMIT)
CREATE TEMP TABLE temp_batch (
    item_id int
) ON COMMIT DROP;
```

# Common Mistakes

- **Schema Search Path**: Temp tables are created in a special schema. If you have a permanent table with the same name, the temp table takes precedence in the search path, which can lead to confusing results.
- **Connection Pooling**: In environments with connection pooling (like PgBouncer), temp tables can persist if sessions are not properly reset, leading to "Table already exists" errors.

# Follow-up Questions

- **Does PostgreSQL have Global Temp Tables?** (Answer: No. Shared data should be stored in permanent tables).
- **Can you index a Temp Table?** (Answer: Yes, just like a normal table).
