---
id: variant.sql.ctes.sql-server
question: question.sql.ctes
technology: tech.sql-server
---
# Expected Answer (SQL Server 2022)

SQL Server CTEs are defined with `WITH` and are valid for a single statement.

-   **Recursion**: Standard for tree traversal.
-   **Readability**: Replaces complex subqueries.

# Why It Matters

CTEs are essential for writing maintainable SQL. They allow you to define logic sequentially at the top of a query. SQL Server 2022's Intelligent Query Processing ensures they are executed efficiently.

# SQL Example

```sql
-- Recursive CTE for Hierarchy
WITH OrgChart AS (
    SELECT EmployeeID, ManagerID, Name, 0 AS Level
    FROM Employees WHERE ManagerID IS NULL
    UNION ALL
    SELECT e.EmployeeID, e.ManagerID, e.Name, oc.Level + 1
    FROM Employees e
    JOIN OrgChart oc ON e.ManagerID = oc.EmployeeID
)
SELECT * FROM OrgChart;
```

# Common Mistakes

- **Semicolon requirement**: The statement before `WITH` must end with a semicolon.
- **MAXRECURSION limit**: Default is 100; recursive queries on deep trees will fail unless this is increased.

# Follow-up Questions

- **CTE vs Temp Table?** (Answer: CTEs are for a single query; Temp tables are for a session).
- **Can a CTE be used in an UPDATE?** (Answer: Yes, you can join a CTE in an UPDATE statement).
