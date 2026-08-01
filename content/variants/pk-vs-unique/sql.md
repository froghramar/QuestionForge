---
id: variant.sql.pk-vs-unique.sql
question: question.sql.pk-vs-unique
technology: tech.sql
---
# Expected Answer

While both **Primary Key (PK)** and **Unique Key (UK)** constraints enforce uniqueness, they serve different purposes in database design:

1.  **Identity vs. Constraint**: A Primary Key is the logical identifier for a row. A Unique Key is a constraint to prevent duplicate data in non-key columns (like an Email or Social Security Number).
2.  **NULL Values**: 
    - **Primary Key**: Cannot contain NULL values (`NOT NULL` is implicit).
    - **Unique Key**: Allows NULL values (though implementation varies).
3.  **Count**: A table can have only one Primary Key but multiple Unique Keys.
4.  **Indexing**: By default, most engines create a Clustered Index for the Primary Key and a Non-Clustered index for Unique Keys.

# Why It Matters

Using the wrong constraint can lead to data integrity issues or performance bottlenecks. For example, if you use a Unique Key instead of a Primary Key for a relationship, you lose the guarantee of a non-null parent. If you forget a Unique Key on an `Email` column, you'll end up with duplicate accounts.

# SQL Example

```sql
CREATE TABLE Users (
    UserID INT PRIMARY KEY,              -- Implicitly NOT NULL, Clustered Index
    Email VARCHAR(255) UNIQUE,          -- Allows one NULL, Non-Clustered Index
    Username VARCHAR(50) NOT NULL,
    SSN VARCHAR(11),
    
    -- Defining a multi-column Unique Key
    CONSTRAINT UQ_Username_SSN UNIQUE (Username, SSN)
);
```

# Common Mistakes

- **Confusing PK with Clustered Index**: While they often coincide, they are separate concepts. You can have a Non-Clustered Primary Key.
- **Assuming UK allows multiple NULLs**: In SQL Server, a Unique Key allows only **one** NULL. In PostgreSQL and Oracle, a Unique Key allows **multiple** NULLs (because NULL != NULL).

# PostgreSQL Notes

In PostgreSQL, the `UNIQUE` constraint allows multiple NULL values. If you want to allow only one NULL, you would need a partial unique index:
`CREATE UNIQUE INDEX uq_email_null ON Users (Email) WHERE Email IS NOT NULL;`

# SQL Server Notes

SQL Server enforces a single NULL limit on `UNIQUE` constraints. To allow multiple NULLs, use a **Filtered Unique Index**:
`CREATE UNIQUE NONCLUSTERED INDEX UX_Email ON Users(Email) WHERE Email IS NOT NULL;`

# Follow-up Questions

- **Can a Primary Key be a Composite Key?** (Answer: Yes, it can consist of multiple columns, and the combination must be unique and non-null).
- **What is a surrogate key vs. a natural key?** (Answer: A surrogate key is a system-generated ID like an Identity/Sequence; a natural key is a value that has business meaning, like an SSN).

# References

- [SQL Standard: Unique Constraints](https://en.wikipedia.org/wiki/Unique_key)
- [PostgreSQL Docs: Unique Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS)
