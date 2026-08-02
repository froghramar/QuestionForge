---
id: variant.sql.joins.postgresql
question: question.sql.joins
technology: tech.postgresql
---
# Expected Answer (PostgreSQL 16)

PostgreSQL supports all standard ANSI SQL join types.

1.  **INNER JOIN**: Returns rows only when there is a match in both tables.
2.  **LEFT JOIN**: Returns all rows from the left table and matched rows from the right.
3.  **RIGHT JOIN**: Returns all rows from the right table and matched rows from the left.
4.  **FULL OUTER JOIN**: Returns all rows when there is a match in either table.
5.  **CROSS JOIN**: Cartesian product.
6.  **LATERAL JOIN**: (PostgreSQL specific) Allows a subquery in the `FROM` clause to refer to columns of preceding `FROM` items.

# Why It Matters

PostgreSQL's optimizer is highly advanced. In version 16, joins on partitioned tables and parallel joins have seen significant performance improvements. Understanding join types is critical for efficient data retrieval in relational models.

# SQL Example

```sql
-- Standard Join
SELECT c.name, o.order_date
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;

-- LATERAL JOIN (Useful for top-N per group)
SELECT c.name, latest_orders.order_date
FROM customers c
CROSS JOIN LATERAL (
    SELECT order_date 
    FROM orders 
    WHERE customer_id = c.id 
    ORDER BY order_date DESC 
    LIMIT 1
) latest_orders;
```

# Common Mistakes

- **Joining on non-indexed columns**: Causes full table scans and poor performance.
- **Forgetting NULLs in OUTER joins**: In a `LEFT JOIN`, right table columns will be `NULL` if no match exists. Filters like `WHERE RightTable.ID > 0` will turn a `LEFT JOIN` into an `INNER JOIN`.
- **Misunderstanding CROSS JOIN**: Producing accidental Cartesian products can hang a session or crash an application.

# Follow-up Questions

- **What is a Hash Join?** (Answer: A join algorithm where Postgres builds a hash table of the smaller relation for fast lookup).
- **Does PostgreSQL support FULL OUTER JOIN?** (Answer: Yes, unlike some other databases like MySQL).
