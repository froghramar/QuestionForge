---
id: variant.sql.delete-vs-truncate.mongodb
question: question.sql.delete-vs-truncate
technology: tech.mongodb
---
# Expected Answer (MongoDB 7.0/8.0)

In MongoDB, the equivalent concepts are:

1.  **db.collection.deleteMany({})**: Similar to `DELETE`. It removes all documents from a collection. It is slower for large sets because it must delete each document and update all associated indexes.
2.  **db.collection.drop()**: Similar to `TRUNCATE`. It removes the entire collection, including all indexes. This is the fastest way to clear data.

# Why It Matters

In MongoDB, deleting millions of documents with `deleteMany` creates a massive amount of work for the wiredTiger storage engine and the oplog (for replication). `drop()` is an atomic metadata operation that is nearly instantaneous.

# Example

```javascript
// Slow (Delete row-by-row)
db.logs.deleteMany({ status: "old" });

// Fast (Nuclear option)
db.temp_data.drop();
```

# Common Mistakes

- **Forgetting Indexes**: `drop()` removes all indexes. If you re-create the collection, you **must** re-create the indexes manually. `deleteMany({})` leaves the index definitions intact.
- **Oplog Bloat**: A large `deleteMany` can fill the oplog, potentially causing replication lag for secondary nodes.

# Follow-up Questions

- **Is there an equivalent to a filtered delete?** (Answer: Yes, `deleteMany({ field: value })`).
- **Does drop() affect the database?** (Answer: No, only the specific collection).
