---
id: variant.sql.delete-vs-truncate.sql-server
question: question.sql.delete-vs-truncate
technology: tech.sql-server
---
# Expected Answer (SQL Server 2022)

`DELETE` is a logged DML operation; `TRUNCATE` is a minimally logged DDL operation.

1.  **Identity**: `TRUNCATE` resets identity seeds.
2.  **Foreign Keys**: `TRUNCATE` is forbidden if the table is referenced by an FK.

# Why It Matters

Choosing between `DELETE` and `TRUNCATE` impacts performance and the transaction log. In SQL Server, `TRUNCATE` is a powerful tool for clearing staging tables but has strict requirements regarding foreign key relationships.

# SQL Example

```sql
-- Selective Delete
DELETE FROM Orders WHERE Status = 'Cancelled';

-- Fast Table Clear
TRUNCATE TABLE StagingOrders;
```

# Common Mistakes

- **Forgetting Identity reset**: `TRUNCATE` will make the next insert start at 1, which might break logic expecting a continuous ID sequence.
- **Log growth**: A massive `DELETE` can fill the transaction log disk.

# Follow-up Questions

- **Is TRUNCATE transactional?** (Answer: Yes, in SQL Server it can be rolled back).
- **Can you truncate a table with a filter?** (Answer: No).
