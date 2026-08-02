---
id: variant.sql.joins.mysql
question: question.sql.joins
technology: tech.mysql
---
# Expected Answer (MySQL 8.4)

MySQL supports standard ANSI joins but with some notable omissions:

1.  **INNER JOIN**: Intersection of sets.
2.  **LEFT/RIGHT JOIN**: One-sided inclusion.
3.  **CROSS JOIN**: Cartesian product.
4.  **FULL OUTER JOIN**: **Not supported directly.** Must be simulated using a `UNION` of a `LEFT JOIN` and a `RIGHT JOIN`.

# Why It Matters

MySQL is the most common database for web applications. Understanding that it lacks `FULL OUTER JOIN` is a classic interview check. MySQL 8.0+ also introduced "Hash Joins," which significantly improves performance for joins where no index is available.

# SQL Example

```sql
-- Simulating a FULL OUTER JOIN in MySQL
SELECT * FROM TableA a LEFT JOIN TableB b ON a.id = b.id
UNION
SELECT * FROM TableA a RIGHT JOIN TableB b ON a.id = b.id;
```

# Common Mistakes

- **Assuming FULL JOIN works**: It will throw a syntax error.
- **Using comma syntax**: `SELECT * FROM A, B` is a CROSS JOIN; it's less readable and harder to maintain than explicit `JOIN` syntax.

# Follow-up Questions

- **What is the Index Merge optimization?** (Answer: When MySQL uses multiple indexes to satisfy a single query).
- **How to optimize a join?** (Answer: Ensure join columns have indexes and compatible data types).
