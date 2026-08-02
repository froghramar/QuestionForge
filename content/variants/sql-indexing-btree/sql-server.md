---
id: variant.sql-indexing-btree.sql-server
question: question.sql-indexing-btree
technology: tech.sql-server
---
# Expected Answer (SQL Server 2022)

SQL Server B-Trees are used for both clustered and non-clustered indexes.

-   **Included Columns**: Creating covering indexes without increasing tree size.
-   **Filtered Indexes**: Indexing a subset of data using a `WHERE` clause.

# Why It Matters

B-Tree indexes are the backbone of SQL Server performance. SQL Server 2022's Intelligent Query Processing features rely on accurate index statistics to choose the best execution path.

# SQL Example

```sql
-- Standard Non-Clustered Index
CREATE INDEX IX_Email ON Users(Email);

-- Covering Index with Included Columns
CREATE INDEX IX_OrderDate_Total ON Orders(OrderDate) INCLUDE(TotalAmount, CustomerID);

-- Filtered Index
CREATE INDEX IX_IncompleteOrders ON Orders(OrderID) WHERE Status = 'Pending';
```

# Common Mistakes

- **Over-indexing**: Each index slows down `INSERT/UPDATE/DELETE`.
- **Key Order**: Forgetting that the order of columns in a composite index must match the query's filter order.

# Follow-up Questions

- **What is a Covering Index?** (Answer: An index containing all columns needed for a query).
- **What are statistics?** (Answer: Data about the distribution of values in an index).
