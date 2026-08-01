---
id: variant.sql.delete-vs-truncate.sql
question: question.sql.delete-vs-truncate
technology: tech.sql
---
# Expected Answer

**DELETE** and **TRUNCATE** both remove data from a table, but they operate at different levels of the database engine:

1.  **Operation Type**: `DELETE` is a DML operation that removes rows one by one. `TRUNCATE` is a DDL operation that deallocates the data pages used by the table.
2.  **Performance**: `TRUNCATE` is significantly faster for large tables because it doesn't log the deletion of each individual row.
3.  **Space Reclamation**: `TRUNCATE` immediately releases the space to the database; `DELETE` often leaves "holes" in pages that are only reclaimed after a vacuum or shrink operation.
4.  **Constraints**: You cannot `TRUNCATE` a table that is referenced by a Foreign Key constraint (unless the FK is disabled or dropped).

# Why It Matters

Using `DELETE` on a table with 100 million rows can bloat the transaction log, cause lock escalation (blocking other users), and take a very long time. `TRUNCATE` is the "nuclear option" for quickly clearing a staging or log table.

# SQL Example

```sql
-- DELETE: Selective and logged
DELETE FROM Orders 
WHERE OrderDate < '2023-01-01';

-- TRUNCATE: All-or-nothing and fast
TRUNCATE TABLE Staging_Orders;
```

# Common Mistakes

- **Assuming TRUNCATE isn't transactional**: In many databases (SQL Server, Postgres), `TRUNCATE` **can** be rolled back if it's inside a transaction block. In others (MySQL), it causes an implicit commit.
- **Forgetting Identity reset**: If you use `DELETE` to clear a table, the next `INSERT` will continue from the last ID. If you use `TRUNCATE`, it starts back at 1 (or the seed).

# Performance Notes

`TRUNCATE` uses fewer system and transaction log resources. `DELETE` requires one log entry for every row deleted, while `TRUNCATE` only logs the deallocation of the data pages.

# PostgreSQL Notes

In PostgreSQL, `TRUNCATE` is fully transactional and safe to use within a `BEGIN/COMMIT` block. It also supports the `CASCADE` option to truncate all tables that have foreign-key references to the table.

# SQL Server Notes

`TRUNCATE` is allowed in a transaction and can be rolled back. However, it is blocked if there are any enabled Foreign Keys pointing to the table, even if those tables are empty.

# Follow-up Questions

- **What happens to the Transaction Log during a massive DELETE?** (Answer: It grows rapidly because it must record every row's previous state to allow for a rollback).
- **Does TRUNCATE fire triggers?** (Answer: No, triggers are row-level or statement-level DML events. Since TRUNCATE is DDL and doesn't process rows, triggers are bypassed).

# References

- [MSDN: TRUNCATE TABLE (Transact-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/statements/truncate-table-transact-sql)
- [PostgreSQL: TRUNCATE](https://www.postgresql.org/docs/current/sql-truncate.html)
