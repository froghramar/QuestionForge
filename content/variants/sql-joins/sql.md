---
id: variant.sql.joins.sql
question: question.sql.joins
technology: tech.sql
---
# Expected Answer

SQL Joins are used to query data from multiple tables based on logical relationships.

1.  **INNER JOIN**: Returns rows only when there is a match in both tables.
2.  **LEFT JOIN (or LEFT OUTER JOIN)**: Returns all rows from the left table and matched rows from the right table. If no match, NULLs are returned for the right table columns.
3.  **RIGHT JOIN (or RIGHT OUTER JOIN)**: Returns all rows from the right table and matched rows from the left table. If no match, NULLs are returned for the left table columns.
4.  **FULL JOIN (or FULL OUTER JOIN)**: Returns all rows when there is a match in one of the tables. It combines the results of both LEFT and RIGHT joins.
5.  **CROSS JOIN**: Returns the Cartesian product of the two tables.
6.  **SELF JOIN**: Joining a table to itself, useful for hierarchical data.

# Why It Matters

Joins are the bread and butter of relational databases. Misunderstanding join types (especially LEFT vs INNER) leads to missing data or incorrect aggregates in reports.

# SQL Example

```sql
-- INNER JOIN: Only customers with orders
SELECT c.CustomerName, o.OrderDate
FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID;

-- LEFT JOIN: All customers, even those without orders
SELECT c.CustomerName, o.OrderDate
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID;

-- SELF JOIN: Employees and their Managers
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employees e
LEFT JOIN Employees m ON e.ManagerID = m.EmployeeID;
```

# Common Mistakes

- **Joining on non-indexed columns**: Causes full table scans and poor performance.
- **Forgetting NULLs in OUTER joins**: When using a LEFT JOIN, remember that columns from the right table will be NULL if no match exists. Logic like `WHERE RightTable.ID > 0` will effectively turn a LEFT JOIN into an INNER JOIN because NULLs are filtered out.

# Follow-up Questions

- **Difference between CROSS JOIN and INNER JOIN?** (Answer: INNER JOIN requires a join condition; CROSS JOIN produces all possible combinations).
- **How to simulate a FULL JOIN in databases that don't support it (like MySQL)?** (Answer: UNION of a LEFT JOIN and a RIGHT JOIN).

# References

- [W3Schools SQL Joins](https://www.w3schools.com/sql/sql_join.asp)
- [PostgreSQL Joins Documentation](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-FROM)
