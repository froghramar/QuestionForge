---
id: variant.sql.clustered-index.mongodb
question: question.sql.clustered-index
technology: tech.mongodb
---
# Expected Answer (MongoDB 7.0/8.0)

Historically, MongoDB (WiredTiger) used heaps. However, MongoDB 5.3+ introduced **Clustered Collections**.

-   **Clustered Collection**: Documents are physically stored in the order of the clustered index key (typically `_id`).
-   **Advantages**: Faster range scans on `_id` and reduced storage size (less index overhead).

# Why It Matters

For high-volume insertion or range-heavy workloads, clustered collections provide significant performance boosts similar to relational clustered indexes. By default, standard collections are still non-clustered heaps.

# Example (Creating a Clustered Collection)

```javascript
db.createCollection("logs", {
   clusteredIndex: {
      "key": { "_id": 1 },
      "unique": true,
      "name": "logs clustered index"
   }
})
```

# Common Mistakes

- **Assuming all collections are clustered**: You must explicitly enable clustering at creation time.
- **Large _id values**: Just like in SQL, a very large clustered key increases the size of all secondary indexes.

# Follow-up Questions

- **Can you cluster on a field other than _id?** (Answer: No, currently MongoDB only supports clustering on the `_id` field).
- **When should you NOT use a clustered collection?** (Answer: When you rarely perform range queries on `_id` and want to save the overhead of maintaining the clustered structure).
