---
id: variant.db-sharding-vs-partitioning.system-design
question: question.db-sharding-vs-partitioning
technology: tech.system-design
---
# Expected Answer

### Horizontal Partitioning (Scaling within a node)
- **Concept:** Splitting a large table into smaller tables (partitions) within the **same database instance**.
- **Management:** Usually handled automatically by the DB engine (e.g., PostgreSQL or SQL Server).
- **Integrity:** ACID properties and joins are maintained because all data is on the same machine.
- **Goal:** Improve performance for very large tables by narrowing the search range (partition pruning).

### Sharding (Scaling across nodes)
- **Concept:** Distributing data across **multiple independent database instances** (shards). Each shard has the same schema but contains a different subset of the data.
- **Management:** Often handled at the application layer or by specialized middleware (e.g., Vitess for MySQL).
- **Integrity:** Transactions across shards are extremely difficult and usually require a Two-Phase Commit (2PC) or Sagas, which hurt performance. Cross-shard joins are usually impossible or extremely slow.
- **Goal:** Infinite horizontal scalability when a single machine can no longer handle the load or storage.

# Common Mistakes
- **Early Sharding:** Sharding adds massive complexity. It should only be done after vertical scaling and partitioning are exhausted.
- **Bad Shard Key:** Choosing a key that leads to "Hot Shards" (e.g., sharding by date where all new traffic goes to the newest shard).

# Follow-up Questions
- What is a "Resharding" event?
- How does Consistent Hashing help in sharding? (Answer: It minimizes data movement when adding or removing shards).
