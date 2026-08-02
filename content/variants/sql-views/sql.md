---
id: variant.sql.views.sql
question: question.sql.views
technology: tech.sql
---
# Expected Answer

A View is a "virtual table" based on the result-set of an SQL statement. We use Views in SQL Server for:

1.  **Security**: You can grant a user permission to query a view while denying them access to the underlying tables. This allows you to hide sensitive columns (like Social Security numbers).
2.  **Simplicity**: You can encapsulate complex logic, multiple joins, and calculations into a single "table" that users can query easily.
3.  **Consistency**: If you change the underlying table structure (e.g., renaming a column), you can update the view definition to keep the interface consistent for reports and applications.
4.  **Logical Organization**: Views can represent a specific business concept (e.g., `ActiveCustomers`) that spans multiple technical tables.

# Why It Matters

Views promote the principle of abstraction. They allow developers to change the database schema without breaking every report or application that depends on it.

# SQL Example

```sql
-- Creating a view to hide sensitive data
CREATE VIEW v_EmployeePublicInfo AS
SELECT EmployeeID, FirstName, LastName, Department
FROM Employees;

-- Querying the view like a table
SELECT * FROM v_EmployeePublicInfo WHERE Department = 'Engineering';
```

# Common Mistakes

- **Performance Overheads**: A standard view is just a saved query. If the view is complex, querying it might be slow. People often forget that querying a view executes the underlying SQL every time.
- **Updating through Views**: While possible, it is restricted. You can usually only update a view if it maps to a single base table and doesn't use aggregates/grouping.

# Follow-up Questions

- **What is an Indexed View (Materialized View)?** (Answer: A view where the result set is persisted on disk via a clustered index, significantly improving performance for complex aggregations).
- **Does a View store data?** (Answer: No, only the definition is stored, unless it is an Indexed View).
