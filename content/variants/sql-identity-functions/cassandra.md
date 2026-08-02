---
id: variant.sql.identity-functions.cassandra
question: question.sql.identity-functions
technology: tech.cassandra
---
# Expected Answer (Cassandra 5.0)

Cassandra does not have an "Identity" or "Auto-Increment" feature because it is a distributed system where a single incrementing counter would become a performance bottleneck.

1.  **UUID**: A 128-bit universally unique identifier. Recommended for most primary keys.
2.  **TimeUUID**: A version 1 UUID that includes the time of generation. Useful for sorting data by time within a partition.

# Why It Matters

In a distributed database, IDs must be unique across many nodes. UUIDs allow nodes to generate identifiers independently without coordination.

# CQL Example

```sql
CREATE TABLE users (
    user_id uuid PRIMARY KEY,
    name text
);

-- Inserting using the built-in uuid() function
INSERT INTO users (user_id, name) VALUES (uuid(), 'Alice');

-- Time-based UUID
INSERT INTO posts (post_id, content) VALUES (now(), 'Hello World');
```

# Common Mistakes

- **Expecting Sequential Integers**: Trying to implement an `int` auto-increment in Cassandra usually involves a "counter" table which is slow and prone to race conditions.
- **Using too many TimeUUIDs**: If two events happen at the exact same microsecond on the same node, they could collide (though very rare).

# Follow-up Questions

- **Difference between uuid() and now()?** (Answer: `uuid()` generates a random v4 UUID; `now()` generates a time-based v1 UUID).
- **Can you use a composite primary key?** (Answer: Yes, it's the standard way to model data in Cassandra).
