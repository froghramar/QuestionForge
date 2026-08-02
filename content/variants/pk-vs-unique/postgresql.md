---
id: variant.sql.pk-vs-unique.postgresql
question: question.sql.pk-vs-unique
technology: tech.postgresql
---
# Expected Answer (PostgreSQL 16)

-   **Primary Key**: Unique, Not Null. One per table.
-   **Unique Constraint**: Unique, allows multiple NULLs.

# Why It Matters

Choosing the correct constraint ensures data integrity. PostgreSQL's treatment of NULLs in unique constraints (allowing many) is SQL-standard compliant but can be a surprise to those coming from SQL Server.

# SQL Example

```sql
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    sku TEXT UNIQUE,          -- Must be unique if present
    internal_code TEXT UNIQUE -- Multiple rows can have NULL internal_code
);

-- How to allow only one NULL (Partial Index)
CREATE UNIQUE INDEX idx_one_null ON products (internal_code) WHERE internal_code IS NOT NULL;
```

# Common Mistakes

- **Assuming Unique means one NULL**: In Postgres, multiple NULLs are allowed in a unique column.
- **Surrogate vs Natural Keys**: Over-using natural keys that might change.

# Follow-up Questions

- **Can a PK be a UUID?** (Answer: Yes).
- **Does a Unique constraint create an index?** (Answer: Yes, a B-Tree index).
