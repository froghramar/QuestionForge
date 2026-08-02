---
id: variant.sql.clustered-index.sql-server
question: question.sql.clustered-index
technology: tech.sql-server
---
# Expected Answer (SQL Server 2022)

The clustered index is the table. Data is physically stored in the order of the index key.

-   **One per table**: Only one physical order possible.
-   **Leaf nodes**: Contain the actual data.

# Why It Matters

Selecting a clustered index is the single most important performance decision in SQL Server. It affects how data is retrieved and how fragmented the table becomes over time. SQL Server 2022 introduces further optimizations for parallel scans on clustered indexes.

# SQL Example

```sql
-- Creating a table with a Clustered Index on an IDENTITY column (Default)
CREATE TABLE Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY, -- Clustered Index created here
    OrderDate DATETIME
);

-- Creating a table with a custom Clustered Index (Non-sequential PK)
CREATE TABLE Events (
    EventID UNIQUEIDENTIFIER PRIMARY KEY NONCLUSTERED,
    EventDate DATETIME INDEX IX_EventDate CLUSTERED
);
```

# Common Mistakes

- **Using random GUIDs**: Causes massive physical fragmentation (page splits).
- **Clustering on large strings**: Makes all non-clustered indexes larger (since they include the clustered key).

# Follow-up Questions

- **What is a Page Split?** (Answer: Physical fragmentation when inserting into a full page).
- **What is a Heap?** (Answer: A table without a clustered index).
