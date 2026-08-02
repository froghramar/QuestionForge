---
id: variant.sql.clustered-index.mysql
question: question.sql.clustered-index
technology: tech.mysql
---
# Expected Answer (MySQL 8.4 - InnoDB)

In MySQL's InnoDB engine, every table has a **Clustered Index**.

-   **Primary Key is Clustered**: By default, the Primary Key is the clustered index.
-   **Fallback**: If no Primary Key is defined, MySQL uses the first `UNIQUE` index with all `NOT NULL` columns. If that doesn't exist, it generates a hidden 6-byte Row ID (`ROWID`) to use as the clustered index.

# Why It Matters

Since data is physically sorted by the Primary Key in InnoDB, choosing a sequential key (like `AUTO_INCREMENT`) is vital. Using a random UUID as a PK causes "Index Page Splits" and massive disk I/O as the engine shuffles rows to maintain order.

# SQL Example

```sql
-- Optimal: Sequential ID
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATETIME
) ENGINE=InnoDB;

-- Sub-optimal: Random UUID (Causes fragmentation)
CREATE TABLE logs (
    id CHAR(36) PRIMARY KEY,
    message TEXT
) ENGINE=InnoDB;
```

# Common Mistakes

- **Defining no Primary Key**: This forces MySQL to manage a hidden ROWID, which can lead to contention in high-concurrency environments.
- **Changing the PK**: Changing a clustered key requires rebuilding the entire table.

# Follow-up Questions

- **What is a Secondary Index in InnoDB?** (Answer: A non-clustered index that stores the Clustered Key as a pointer to the data).
- **What is the "Clustered Index" in MyISAM?** (Answer: MyISAM does not support clustered indexes; data is stored in the order it was inserted).
