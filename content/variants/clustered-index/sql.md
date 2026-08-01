---
id: variant.sql.clustered-index.sql
question: question.sql.clustered-index
technology: tech.sql
---
# Expected Answer

A **Clustered Index** defines the physical order in which data is stored in a table. In databases like SQL Server or MySQL (InnoDB), the table **is** the clustered index. The leaf nodes of the B-Tree structure contain the actual data rows of the table.

Because the data can only be physically sorted in one way, a table can have **only one** clustered index. Typically, this is created automatically on the Primary Key, but you can choose a different column.

# Why It Matters

Choosing the right clustered index is the most important decision for a table's performance. Since the data is sorted, range scans (e.g., `WHERE Date BETWEEN 'A' AND 'B'`) are extremely fast. However, if you choose a random key (like a UUID v4) as your clustered index, every insert will cause **Page Splits**, fragmenting the data and severely degrading performance.

# SQL Example

```sql
-- Creating a table with a Clustered Index on an IDENTITY column (Default)
CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY, -- Clustered Index created here
    OrderDate DATETIME,
    CustomerID INT
);

-- Creating a table with a custom Clustered Index
CREATE TABLE LogEntries (
    LogID UNIQUEIDENTIFIER DEFAULT NEWID(),
    LogDate DATETIME NOT NULL,
    Message NVARCHAR(MAX),
    -- We want the physical order to be chronological, not by GUID
    CONSTRAINT PK_LogEntries PRIMARY KEY NONCLUSTERED (LogID),
    INDEX IX_LogDate_Clustered CLUSTERED (LogDate)
);
```

# Common Mistakes

- **Using a GUID (Random) as Clustered Key**: Causes massive fragmentation and slow inserts because the engine has to shuffle data to maintain order.
- **Clustering on a frequently updated column**: When a clustered key value changes, the database may have to physically move the row to a new location.
- **Making the Clustered Key too wide**: Every Non-Clustered index stores the Clustered Key as a pointer. A wide clustered key (like a long string) makes all other indexes larger.

# Performance Notes

- **Read**: $O(\log n)$. Range scans are optimal because data is physically contiguous.
- **Write**: Highly efficient if keys are sequential (appended to the end). High overhead if keys are random (causing page splits).

# PostgreSQL Notes

Postgres does **not** have "Clustered Indexes" in the same way SQL Server or MySQL do. By default, tables are "Heaps" (unordered). You can use the `CLUSTER` command to reorder a table based on an index, but this is a one-time operation and is not maintained as new data is inserted.

# SQL Server Notes

In SQL Server, if a table has no clustered index, it is called a **Heap**. Non-clustered indexes on a heap use a **RID** (Row ID) to point to data. On a clustered table, they use the **Clustering Key**.

# Follow-up Questions

- **What happens if you don't define a Primary Key?** (Answer: In InnoDB, the engine will pick the first Unique Not Null index, or generate a hidden 6-byte Row ID).
- **Can you have a Clustered Index that is NOT a Unique Index?** (Answer: Yes, but the database will add a hidden "uniquifier" to the keys behind the scenes to distinguish rows).

# References

- [SQL Server Index Architecture and Design Guide](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide)
- [MySQL InnoDB Table and Index Structures](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html)
