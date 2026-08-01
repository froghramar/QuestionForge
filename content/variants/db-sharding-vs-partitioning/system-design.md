---
id: variant.db-sharding-vs-partitioning.system-design
question: question.db-sharding-vs-partitioning
technology: tech.system-design
---
# Expected Answer

### Partitioning (Single Database)

Partitioning splits a large table into smaller, more manageable pieces **within the same database instance**.

- **Horizontal partitioning (Range/List/Hash)**: Rows are distributed across partitions based on a column value. Example: orders partitioned by `created_date` into monthly partitions.
- **Vertical partitioning**: Columns are split across tables. Example: moving a `BLOB` column to a separate table to keep the main table's rows small.
- **Benefits**: Faster queries (partition pruning), easier maintenance (drop old partitions), improved I/O distribution.
- **Constraint**: Still limited by a single server's CPU, memory, and disk.

### Sharding (Multiple Databases)

Sharding distributes data across **multiple independent database servers**, each holding a subset of the data.

- **Shard key**: The column used to determine which shard a row belongs to (e.g., `user_id % N`).
- **Benefits**: Horizontal scaling beyond a single machine's limits, independent failure domains.
- **Costs**: Application-level routing, cross-shard queries are expensive or impossible, distributed transactions require 2PC or Saga patterns.

### Key Differences

| Aspect | Partitioning | Sharding |
|---|---|---|
| Scope | Single database | Multiple databases/servers |
| Scaling | Vertical (bigger machine) | Horizontal (more machines) |
| Cross-partition queries | Fast (same engine) | Slow (network hops, no joins) |
| Transactions | Full ACID | Requires distributed coordination |
| Complexity | Database-managed | Application-managed |

### Shard Key Selection

A bad shard key creates **hotspots** — one shard receives disproportionate traffic. For example, sharding a social media app by `country` puts most traffic on the US shard. A good shard key distributes writes evenly (e.g., `user_id`).

# Common Mistakes

- **Confusing the two**: Partitioning is a database-level optimization; sharding is an architectural pattern. They solve different problems and can be used together.
- **Sharding prematurely**: Sharding adds enormous operational complexity. Most applications should exhaust vertical scaling, read replicas, and caching before sharding.
- **Choosing a shard key based on read patterns only**: The shard key must distribute writes evenly. Optimizing for reads often means denormalizing data or maintaining secondary indexes across shards.

# Follow-up Questions

- How do you handle cross-shard joins? (Answer: You generally don't. Denormalize the data so each shard has what it needs, or use a scatter-gather query pattern at the application level).
- What is consistent hashing and why is it useful for sharding? (Answer: Consistent hashing minimizes data movement when shards are added or removed. Instead of rehashing all keys, only keys in the affected range need to move).
