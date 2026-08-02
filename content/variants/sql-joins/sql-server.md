---
id: variant.sql.joins.sql-server
question: question.sql.joins
technology: tech.sql-server
---
# Expected Answer (SQL Server 2022)

SQL Server supports standard ANSI joins and specific hints.

1.  **INNER JOIN**: Matches in both tables.
2.  **LEFT/RIGHT OUTER JOIN**: One-sided matches.
3.  **FULL OUTER JOIN**: All rows from both sides.
4.  **CROSS JOIN**: Cartesian product.
5.  **CROSS APPLY / OUTER APPLY**: SQL Server's equivalent to LATERAL joins, used for joining a table to a table-valued function or subquery that references the outer table.

# Why It Matters

SQL Server 2022 introduced Intelligent Query Processing (IQP) enhancements that improve join performance automatically (e.g., Adaptive Joins). Choosing the correct join type ensures the optimizer can select the best algorithm (Nested Loops, Merge, or Hash).

# SQL Example

```sql
-- CROSS APPLY example (similar to LATERAL)
SELECT c.CustomerName, o.OrderDate
FROM Customers c
CROSS APPLY (
    SELECT TOP 1 OrderDate
    FROM Orders
    WHERE CustomerID = c.CustomerID
    ORDER BY OrderDate DESC
) o;
```

# Common Mistakes

- **Forcing Join Hints**: Using `INNER LOOP JOIN` or `INNER HASH JOIN` manually often prevents the optimizer from adapting to data changes.
- **Null handling in Joins**: Standard joins do not match `NULL = NULL`. You must use `OR (a.col IS NULL AND b.col IS NULL)` if NULL matching is required.

# Follow-up Questions

- **What is an Adaptive Join?** (Answer: An IQP feature that allows SQL Server to defer the choice between a Hash Join and a Nested Loop join until execution starts).
- **Difference between CROSS JOIN and CROSS APPLY?** (Answer: CROSS JOIN joins two static sets; CROSS APPLY joins a set to a functionally dependent set).
