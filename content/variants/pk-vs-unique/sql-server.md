---
id: variant.sql.pk-vs-unique.sql-server
question: question.sql.pk-vs-unique
technology: tech.sql-server
---
# Expected Answer (SQL Server 2022)

-   **Primary Key**: Unique, Not Null. One per table.
-   **Unique Constraint**: Unique, allows only one NULL.

# Why It Matters

SQL Server's "one NULL only" rule for unique constraints is a common design hurdle. Understanding the difference between PKs and Unique constraints is essential for proper normalization and indexing strategy.

# SQL Example

```sql
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    SKU VARCHAR(50) UNIQUE,           -- Unique, no NULLs allowed if PK
    InternalCode VARCHAR(50) UNIQUE   -- Only ONE row can have NULL
);

-- How to allow multiple NULLs (Filtered Unique Index)
CREATE UNIQUE NONCLUSTERED INDEX UX_InternalCode 
ON Products(InternalCode) 
WHERE InternalCode IS NOT NULL;
```

# Common Mistakes

- **NULL handling**: Forgetting that adding a unique constraint on an optional column only allows one person to have a NULL value in SQL Server.
- **PK choice**: Using a volatile column as a Primary Key.

# Follow-up Questions

- **How to allow multiple NULLs?** (Answer: Filtered Unique Index).
- **Is the PK always clustered?** (Answer: No, but it is by default).
