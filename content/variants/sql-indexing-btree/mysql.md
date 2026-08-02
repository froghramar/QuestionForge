---
id: variant.sql-indexing-btree.mysql
question: question.sql-indexing-btree
technology: tech.mysql
---
# Expected Answer (MySQL 8.4)

MySQL's primary index structure is the B+Tree.

-   **B+Tree vs B-Tree**: MySQL uses B+Tree where data is only stored in leaf nodes, and leaf nodes are linked, making range scans very efficient.
-   **Left-Prefix Rule**: In a composite index `(col1, col2)`, MySQL can only use the index if `col1` is provided in the query.

# Why It Matters

Understanding the B+Tree structure explains why `ORDER BY` and `GROUP BY` can often be satisfied by an index without a "filesort" in MySQL. 

# SQL Example

```sql
-- Composite index
CREATE INDEX idx_user_status ON users(status, last_login);

-- SARGable (Uses index)
SELECT * FROM users WHERE status = 'active' ORDER BY last_login;

-- NOT SARGable for filtering (Violates left-prefix)
SELECT * FROM users WHERE last_login > '2024-01-01';
```

# Common Mistakes

- **Incorrect Column Order**: Putting high-cardinality columns at the end of a composite index when they are frequently used for filtering.
- **Over-indexing**: Creating too many indexes which slows down `INSERT` performance.

# Follow-up Questions

- **What is a Covering Index?** (Answer: An index that contains all columns needed for the query).
- **What is a Prefix Index?** (Answer: Indexing only the first N characters of a string column).
