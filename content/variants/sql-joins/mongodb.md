---
id: variant.sql.joins.mongodb
question: question.sql.joins
technology: tech.mongodb
---
# Expected Answer (MongoDB 7.0/8.0)

MongoDB is NoSQL and typically encourages **Embedding** over joining. However, it supports "joins" via the `$lookup` aggregation stage.

-   **$lookup**: Performs a left outer join to an unsharded collection in the same database.
-   **Unwind**: Often used after `$lookup` to transform the resulting array of joined documents into individual documents (simulating an INNER JOIN effect).

# Why It Matters

In a document database, joins are expensive. The architecture goal is "Data that is accessed together should be stored together." However, `$lookup` is essential for analytics and reports where data normalization was necessary.

# Example (Aggregation Pipeline)

```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_details"
    }
  },
  { $unwind: "$customer_details" } // Converts array to object (simulates Inner Join)
])
```

# Common Mistakes

- **Over-using $lookup**: If you find yourself using `$lookup` in every query, your schema is likely too normalized for MongoDB.
- **Missing Indexes**: The `foreignField` in the target collection must be indexed for `$lookup` to be performant.

# Follow-up Questions

- **Can you join across different databases?** (Answer: No, `$lookup` is restricted to the same database).
- **Embedding vs Referencing?** (Answer: Use embedding for 1-to-1 or 1-to-many where the 'many' is small; use referencing for large datasets).
