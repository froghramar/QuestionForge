---
id: variant.sql.views.sql-server
question: question.sql.views
technology: tech.sql-server
---
# Expected Answer (SQL Server 2022)

SQL Server views provide security and logical simplification.

1.  **Standard Views**: A stored query definition.
2.  **Indexed Views (Materialized)**: A view with a unique clustered index. SQL Server persists the result set and automatically keeps it updated.
3.  **Partitioned Views**: Combining data from multiple tables.

# Why It Matters

SQL Server 2022 enhances how the optimizer handles views, especially with PSP optimization. Indexed views are critical for performance in BI scenarios as they physically store the result and are maintained by the engine automatically.

# SQL Example

```sql
-- Creating an Indexed View
CREATE VIEW dbo.SalesTotals
WITH SCHEMABINDING
AS
SELECT ProductID, SUM(LineTotal) as Total, COUNT_BIG(*) as Count
FROM dbo.SalesDetails
GROUP BY ProductID;
GO

CREATE UNIQUE CLUSTERED INDEX IX_SalesTotals ON dbo.SalesTotals (ProductID);
```

# Common Mistakes

- **SCHEMABINDING requirement**: You cannot create an indexed view without `SCHEMABINDING`, which prevents you from altering underlying tables.
- **Ignoring the cost of Indexed Views**: While they speed up reads, they slow down `INSERT/UPDATE/DELETE` on base tables because the index must be updated synchronously.

# Follow-up Questions

- **What is SCHEMABINDING?** (Answer: Prevents changes to the underlying tables that would break the view).
- **Can a view improve performance?** (Answer: Standard views usually don't; Indexed Views do).
