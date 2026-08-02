---
id: variant.sql.clustered-index.cassandra
question: question.sql.clustered-index
technology: tech.cassandra
---
# Expected Answer (Cassandra 5.0)

Cassandra uses a two-part Primary Key to control physical storage:

1.  **Partition Key**: Determines which node in the cluster stores the data.
2.  **Clustering Columns**: Determines the **physical sort order** of data within a partition on disk. This is Cassandra's equivalent of a Clustered Index.

# Why It Matters

Because data is physically sorted by the clustering columns, range queries (e.g., `WHERE date > '2023-01-01'`) are extremely fast, provided they are within a single partition. Proper selection of clustering columns is the core of Cassandra data modeling.

# CQL Example

```sql
-- user_id is the Partition Key
-- posted_at is the Clustering Column (physically sorted)
CREATE TABLE user_posts (
    user_id uuid,
    posted_at timestamp,
    content text,
    PRIMARY KEY (user_id, posted_at)
) WITH CLUSTERING ORDER BY (posted_at DESC);
```

# Common Mistakes

- **Queries across partitions**: Range queries that don't specify a Partition Key are extremely slow (full cluster scans).
- **Too many rows per partition**: Partitions should generally stay under 100MB to avoid performance issues.

# Follow-up Questions

- **What is a composite partition key?** (Answer: Using multiple columns to define the partition, e.g., `PRIMARY KEY ((tenant_id, user_id), posted_at)`).
- **Can you change clustering order later?** (Answer: No, it requires a table migration).
