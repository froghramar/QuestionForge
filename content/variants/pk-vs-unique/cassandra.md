---
id: variant.sql.pk-vs-unique.cassandra
question: question.sql.pk-vs-unique
technology: tech.cassandra
---
# Expected Answer (Cassandra 5.0)

Cassandra does **not** have a separate "Unique Key" constraint. Uniqueness is strictly tied to the **Primary Key**.

-   **Upsert Behavior**: In Cassandra, an `INSERT` with an existing Primary Key is actually an `UPDATE` (Upsert). It does not fail with a "Duplicate Key" error unless you use `IF NOT EXISTS` (Lightweight Transactions).
-   **No Unique Secondary Indexes**: You cannot create a secondary index that enforces uniqueness across the cluster.

# Why It Matters

Data modeling in Cassandra is "Query-Driven." If you need data to be unique by Email and by UserID, you must create two separate tables: one keyed by UserID and one keyed by Email.

# CQL Example

```sql
-- Standard Primary Key
CREATE TABLE users_by_email (
    email text PRIMARY KEY,
    user_id uuid,
    name text
);

-- Conditional Insert (LWT - Performance cost)
INSERT INTO users_by_email (email, user_id) 
VALUES ('alice@example.com', uuid()) 
IF NOT EXISTS;
```

# Common Mistakes

- **Expecting Uniqueness Errors**: Assuming `INSERT` will fail if data exists. It will simply overwrite it.
- **Overusing IF NOT EXISTS**: Lightweight Transactions (LWT) require multiple round-trips (Paxos) and are much slower than standard writes.

# Follow-up Questions

- **What is a Tombstone?** (Answer: A marker created when data is deleted).
- **Why are there no unique indexes?** (Answer: Enforcing uniqueness in a distributed system requires cluster-wide coordination, which violates Cassandra's "availability-first" design).
