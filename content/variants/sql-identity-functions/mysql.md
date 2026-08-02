---
id: variant.sql.identity-functions.mysql
question: question.sql.identity-functions
technology: tech.mysql
---
# Expected Answer (MySQL 8.4)

MySQL uses the `AUTO_INCREMENT` attribute for identity columns.

1.  **LAST_INSERT_ID()**: Returns the first automatically generated value that was set for an `AUTO_INCREMENT` column by the **most recent** `INSERT` statement in the **current session**.
2.  **Scope**: It is session-safe. It is not affected by other clients' inserts.

# Why It Matters

In MySQL, `LAST_INSERT_ID()` is the standard way to retrieve the ID of a newly created record for use in foreign keys. Unlike SQL Server, MySQL doesn't have multiple scope functions like `SCOPE_IDENTITY()`.

# SQL Example

```sql
INSERT INTO users (name) VALUES ('Bob');
SELECT LAST_INSERT_ID();
```

# Common Mistakes

- **Multi-row inserts**: If you insert 10 rows at once, `LAST_INSERT_ID()` only returns the ID of the **first** row inserted by that statement.
- **Trigger behavior**: Unlike SQL Server's `@@IDENTITY`, MySQL's `LAST_INSERT_ID()` is **not** affected by inserts inside triggers.

# Follow-up Questions

- **What happens if you manually insert an ID?** (Answer: The auto-increment counter is updated to `MAX(id) + 1`).
- **Can you change the seed?** (Answer: Yes, using `ALTER TABLE ... AUTO_INCREMENT = 100`).
