---
id: variant.sql.temp-tables.sql
question: question.sql.temp-tables
technology: tech.sql
---
# Expected Answer

In SQL Server, temporary tables are stored in `tempdb`.

1.  **Local Temporary Tables (`#`)**:
    -   Prefix: Single hash `#`.
    -   Scope: Visible only to the connection that created it.
    -   Lifetime: Automatically dropped when the procedure or connection that created it is closed.
2.  **Global Temporary Tables (`##`)**:
    -   Prefix: Double hash `##`.
    -   Scope: Visible to all connections.
    -   Lifetime: Dropped when the creating connection is closed and all other sessions referencing it have finished.

# Why It Matters

Local temp tables are the standard for private intermediate storage. Global temp tables are rarely used but are helpful for sharing data across different sessions or applications without persisting it to a permanent table.

# SQL Syntax

```sql
-- Local Temp Table
CREATE TABLE #LocalTemp (
    ID INT PRIMARY KEY,
    Data VARCHAR(100)
);
INSERT INTO #LocalTemp VALUES (1, 'Local Data');
SELECT * FROM #LocalTemp;

-- Global Temp Table
CREATE TABLE ##GlobalTemp (
    ID INT PRIMARY KEY,
    Data VARCHAR(100)
);
INSERT INTO ##GlobalTemp VALUES (1, 'Shared Data');
SELECT * FROM ##GlobalTemp;
```

# Common Mistakes

- **Naming Collisions**: Local temp tables are appended with a unique suffix in `tempdb`, so multiple sessions can use `#MyTable` without conflict. Global temp tables (`##MyTable`) have a single name, so naming collisions **will** occur if two sessions try to create them simultaneously.
- **Forgetting Scope**: Thinking a `#temp` table created in one Stored Procedure will be available in a sibling procedure called by the same connection (it is, but generally, child scopes can see parent temp tables, but not vice versa).

# Follow-up Questions

- **Temp Table vs Table Variable (@table)?** (Answer: Temp tables support indexes and statistics; Table variables generally don't (except for PKs) and are best for very small datasets).
- **Where are temp tables stored?** (Answer: In the system database `tempdb`).
