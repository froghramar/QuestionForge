---
id: variant.sql.delete-vs-truncate.cassandra
question: question.sql.delete-vs-truncate
technology: tech.cassandra
---
# Expected Answer (Cassandra 5.0)

Cassandra handles deletions fundamentally differently because of its LSM-tree architecture.

1.  **DELETE**: Does not actually remove data immediately. It writes a **Tombstone** (a marker that the data is deleted). The data is physically removed later during **Compaction**.
2.  **TRUNCATE**: A cluster-wide DDL operation that removes all data from all nodes for a specific table.

# Why It Matters

In Cassandra, "deleting too much" can actually make your database **slower**. If you have many tombstones, the database must read through them to find "live" data. This is known as "Tombstone Pressure." `TRUNCATE` avoids this by clearing the data files (SSTables) entirely.

# CQL Example

```sql
-- Creates a tombstone
DELETE FROM users WHERE user_id = 123;

-- Clears all nodes (Immediate)
TRUNCATE users;
```

# Common Mistakes

- **Using DELETE for bulk clearing**: This creates millions of tombstones and can lead to `TombstoneOverwhelmingException`.
- **Assuming immediate disk space reclamation**: Deletes only free space after the tombstone expires (`gc_grace_seconds`) and compaction runs.

# Follow-up Questions

- **What is gc_grace_seconds?** (Answer: The time a tombstone is kept to ensure it replicates to all nodes before being deleted).
- **Can you roll back a TRUNCATE?** (Answer: No).
