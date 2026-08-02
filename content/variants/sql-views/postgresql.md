---
id: variant.sql.views.postgresql
question: question.sql.views
technology: tech.postgresql
---
# Expected Answer (PostgreSQL 16)

PostgreSQL views are powerful abstraction tools.

1.  **Standard Views**: Virtual tables representing a stored query.
2.  **Materialized Views**: Views that physically store data on disk and must be refreshed.
3.  **Recursive Views**: Using `WITH RECURSIVE` within a view.

# Why It Matters

PostgreSQL's `MATERIALIZED VIEW` is a major feature for performance, allowing complex aggregations to be pre-calculated. PostgreSQL 16 allows for even more efficient query plans involving views through improved subquery pulling. Views promote the principle of abstraction and security.

# SQL Example

```sql
-- Standard View
CREATE VIEW active_users AS
SELECT id, email FROM users WHERE is_active = true;

-- Materialized View
CREATE MATERIALIZED VIEW sales_summary AS
SELECT region, SUM(amount) FROM sales GROUP BY region;

-- Refreshing a Materialized View (without blocking readers in PG 16)
REFRESH MATERIALIZED VIEW CONCURRENTLY sales_summary;
```

# Common Mistakes

- **Refresh Latency**: Forgetting that Materialized Views are not automatically updated. You must trigger a `REFRESH`.
- **Performance Overheads**: Treating a complex view as a "simple" table without realizing it executes a 10-way join under the hood every time.

# Follow-up Questions

- **Difference between View and Materialized View?** (Answer: A View runs the query every time; a Materialized View stores the result set).
- **Can you update a PostgreSQL view?** (Answer: Yes, if the view is "simple", or by using `INSTEAD OF` triggers).
