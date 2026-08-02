---
id: variant.sql.ctes.sql
question: question.sql.ctes
technology: tech.sql
---
# Expected Answer

A **Common Table Expression (CTE)** is a temporary result set that you can reference within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement.

-   **Purpose**: They replace complex subqueries, making code more readable.
-   **Recursion**: They are the standard way to handle hierarchical data (like org charts).
-   **Syntax**: Defined using the `WITH` keyword.

# Why It Matters

CTEs are cleaner than subqueries because they allow you to define the data logic at the top of the script, rather than burying it deep within `JOIN` or `FROM` clauses.

# SQL Examples

### Basic CTE for Readability
```sql
WITH RecentOrders AS (
    SELECT CustomerID, MAX(OrderDate) as LastOrder
    FROM Orders
    GROUP BY CustomerID
)
SELECT c.Name, ro.LastOrder
FROM Customers c
JOIN RecentOrders ro ON c.CustomerID = ro.CustomerID;
```

### Using CTE for Inserting Data
You can define a CTE and then use it as the source for an `INSERT` statement.
```sql
WITH NewProducts AS (
    SELECT 'Widget A' as Name, 19.99 as Price
    UNION ALL
    SELECT 'Widget B', 29.99
)
INSERT INTO Products (ProductName, Price)
SELECT Name, Price FROM NewProducts;
```

# Common Mistakes

- **Multiple CTEs**: When using multiple CTEs, you only use the `WITH` keyword once. Subsequent CTEs are separated by commas.
- **Semicolon Requirement**: In SQL Server, the statement *before* a `WITH` must be terminated with a semicolon. Many developers just start the line with `;WITH` to be safe.
- **CTE Lifetime**: A CTE only exists for the scope of the single statement that follows it. You cannot reference it three statements later.

# Follow-up Questions

- **CTE vs Temp Table?** (Answer: CTEs are in-memory and only exist for one query; Temp tables are stored in `tempdb` and exist for the session).
- **What is MAXRECURSION?** (Answer: An option to prevent infinite loops in recursive CTEs; default is 100).
