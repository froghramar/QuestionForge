---
id: variant.sql.pk-vs-unique.mysql
question: question.sql.pk-vs-unique
technology: tech.mysql
---
# Expected Answer (MySQL 8.4)

-   **Primary Key**: Unique, Not Null, and determines physical storage (Clustered).
-   **Unique Key**: Unique, allows multiple NULLs (standard behavior in InnoDB).

# Why It Matters

MySQL handles NULLs in Unique keys similarly to PostgreSQL (allowing multiples). This is important for data integrity design where a field like `SSN` or `LicensePlate` might be optional but must be unique if present.

# SQL Example

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE, -- Multiple users can have NULL email
    username VARCHAR(50) NOT NULL UNIQUE
);
```

# Common Mistakes

- **Confusing PK with Clustered Index**: While they are the same by default in InnoDB, they are different logical concepts.
- **NULL Handling**: Expecting a `UNIQUE` constraint to allow only one `NULL` (this is SQL Server behavior, not MySQL).

# Follow-up Questions

- **Can you have multiple Primary Keys?** (Answer: No, only one, but it can be composite).
- **What is the difference between a Key and an Index in MySQL?** (Answer: In MySQL, `KEY` is a synonym for `INDEX`).
