---
id: variant.db-sharding-vs-partitioning.system-design
question: question.db-sharding-vs-partitioning
technology: tech.system-design
---
# Expected Answer

While both techniques split large datasets, they operate at different levels:

- **Partitioning**: A database-level feature that splits a table into smaller pieces **within a single database instance**. It is usually transparent to the application.
- **Sharding**: An architectural pattern that distributes data across **multiple independent database servers**. Each server (shard) holds a subset of the data.

# Why It Matters

Scalability limits. Partitioning helps manage large tables and improves query performance (via partition pruning) but is still limited by a single server's resources (CPU/RAM). Sharding allows for **Horizontal Scaling**, enabling a system to handle billions of rows and millions of requests by adding more machines. However, sharding introduces massive complexity: cross-shard joins become impossible, and transactions across shards require complex coordination.

# Example Code

### Partitioning (PostgreSQL)

```sql
-- Create a partitioned table by range
CREATE TABLE orders (
    id int,
    order_date date not null,
    total decimal
) PARTITION BY RANGE (order_date);

-- Create specific partitions
CREATE TABLE orders_2023_q1 PARTITION OF orders
    FOR VALUES FROM ('2023-01-01') TO ('2023-04-01');
```

### Sharding (Application Logic)

```javascript
// A simple shard routing function
function getShardConnection(userId) {
  const shardCount = 4;
  const shardId = userId % shardCount;
  return dbConnections[shardId];
}

const db = getShardConnection(user.id);
await db.query("INSERT INTO orders ...");
```

# Common Mistakes

- **Premature Sharding**: Sharding is an operational burden. Most apps should exhaust vertical scaling, read replicas, and caching before moving to a sharded architecture.
- **Choosing a bad Shard Key**: A shard key that creates "hotspots" (e.g., sharding by `country` where 90% of users are in one country) defeats the purpose of sharding.
- **Confusing Partitioning with Sharding**: Thinking that partitioning a table will allow it to scale beyond the storage limits of a single machine.

# Follow-up Questions

- **What is a "Hot Shard"?** (Answer: A shard that receives a disproportionate amount of traffic compared to others, usually due to an uneven distribution of the shard key).
- **How do you handle cross-shard queries?** (Answer: Either by denormalizing data so it exists on all shards, or by using a query aggregator/proxy layer that executes queries on all shards and merges results).

# References

- [Database Sharding: Concepts and Best Practices](https://www.digitalocean.com/community/tutorials/understanding-database-sharding)
- [PostgreSQL Documentation: Table Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html)
