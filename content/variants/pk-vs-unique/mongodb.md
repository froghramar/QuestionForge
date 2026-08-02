---
id: variant.sql.pk-vs-unique.mongodb
question: question.sql.pk-vs-unique
technology: tech.mongodb
---
# Expected Answer (MongoDB 7.0/8.0)

-   **Primary Key (_id)**: Unique, immutable, and automatically generated if missing.
-   **Unique Index**: Enforces uniqueness on any other field.

# Why It Matters

Unique indexes in MongoDB are the primary way to enforce business-level uniqueness (like email addresses) since NoSQL databases lack many of the constraints found in RDBMS.

# Example

```javascript
db.users.createIndex({ email: 1 }, { unique: true });
```

# Common Mistakes

- **Duplicate Nulls**: A unique index only allows one document to *lack* the field (as `null` is a value). Use `sparse: true` to allow multiple documents to not have the field.
- **Sharding**: Unique constraints on non-shard-key fields are restricted.

# Follow-up Questions

- **Can you change the _id of a document?** (Answer: No, it is immutable).
- **What is a Sparse Index?** (Answer: An index that only includes documents that have the field).
