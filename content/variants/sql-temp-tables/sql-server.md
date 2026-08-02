---
id: variant.sql.temp-tables.sql-server
question: question.sql.temp-tables
technology: tech.sql-server
---
# Expected Answer (SQL Server 2022)

SQL Server uses `tempdb` for temporary storage.

1.  **Local Temporary Tables (#)**: Visible only to the current session/connection.
2.  **Global Temporary Tables (##)**: Visible to all sessions. Dropped when the creating session ends and no other sessions are using it.

# Why It Matters

In SQL Server 2022, `tempdb` scalability was further improved with Concurrent GAM updates. Local temp tables are the standard for private intermediate storage in stored procedures, while Global temp tables allow sharing data across different sessions without persistence.

# SQL Syntax

```sql
-- Local Temp Table
CREATE TABLE #ProcessingQueue (
    ID INT PRIMARY KEY,
    Status VARCHAR(20)
);

-- Global Temp Table
CREATE TABLE ##SharedConfig (
    KeyName VARCHAR(50),
    Value VARCHAR(50)
);
```

# Common Mistakes

- **Naming Collisions on Global Tables**: Since `##Table` names are global, two sessions trying to create the same name will fail.
- **Stored Procedure Recompilation**: Frequent creation/dropping of temp tables in stored procedures can cause recompilation, though SQL Server 2022 has improved "Temp Table Caching" to mitigate this.

# Follow-up Questions

- **Temp Table vs Table Variable (@table)?** (Answer: Temp tables have statistics and support all index types, making them better for large datasets than table variables).
- **What is the 'Memory-Optimized' Temp Table?** (Answer: Resides in memory and reduces tempdb disk I/O).
