---
id: variant.sql-indexing-btree.mongodb
question: question.sql-indexing-btree
technology: tech.mongodb
---
# Expected Answer (MongoDB 7.0/8.0)

MongoDB uses B-Tree indexes for standard queries.

-   **Multikey Indexes**: Indexing an array field creates entries for every element.
-   **Compound Indexes**: Supports sorting and filtering on multiple fields (ESR Rule: Equality, Sort, Range).
-   **Text Indexes**: For string searches.

# Why It Matters

Indexes are critical in MongoDB to avoid "Collection Scans" which are extremely slow. B-Trees allow for efficient filtering and sorting, and features like TTL indexes allow for automatic data cleanup.

# Example

```javascript
// Compound Index following ESR rule
db.users.createIndex({ status: 1, last_login: -1, age: 1 });
```

# Common Mistakes

- **Incorrect ESR Order**: Putting the range filter before the sort field in a compound index.
- **Index Bloat**: Creating too many multikey indexes on large arrays.

# Follow-up Questions

- **What is an Index-Only scan?** (Answer: When the index contains all data needed, skipping the document fetch).
- **What is a Partial Index?** (Answer: Indexing only documents that match a filter).
