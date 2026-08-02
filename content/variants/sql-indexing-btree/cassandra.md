---
id: variant.sql-indexing-btree.cassandra
question: question.sql-indexing-btree
technology: tech.cassandra
---
# Expected Answer (Cassandra 5.0)

Cassandra does **not** use B-Trees for its primary storage. It uses an **LSM-Tree** (Log-Structured Merge-Tree) architecture.

-   **SSTables**: Data is written to immutable files on disk called SSTables.
-   **Primary Index**: The Partition Key acts as the primary index to locate which node and which SSTable contains the data.
-   **Secondary Indexes**: Cassandra supports secondary indexes, but they are "local" to each node and can be slow if used incorrectly.
-   **SAI (Storage Attached Indexing)**: The modern way to index non-PK columns in Cassandra 5.0, offering better performance than traditional secondary indexes.

# Why It Matters

Understanding that Cassandra isn't a B-Tree database is fundamental. In B-Trees, writes involve in-place updates which can be slow. In LSM-Trees, writes are append-only, making Cassandra exceptionally fast for write-heavy workloads but requiring "Compaction" to maintain read performance.

# CQL Example

```sql
-- Creating a Storage Attached Index (SAI)
CREATE INDEX ON users (email) USING 'StorageAttachedIndex';

-- Querying using the index
SELECT * FROM users WHERE email = 'alice@example.com';
```

# Common Mistakes

- **Using Secondary Indexes for High Cardinality**: Traditional secondary indexes perform poorly on columns with many unique values (like `email`) because they require querying every node. SAI is better but still has costs.
- **Indexing everything**: In Cassandra, it's usually better to create a new table designed for your query than to add an index to an existing table.

# Follow-up Questions

- **What is Compaction?** (Answer: The process of merging SSTables and removing old/deleted data).
- **Difference between B-Tree and LSM-Tree?** (Answer: B-Tree is optimized for reads/in-place updates; LSM-Tree is optimized for high-volume append-only writes).
