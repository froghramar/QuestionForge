---
id: variant.sql-indexing-btree.sql
question: question.sql-indexing-btree
technology: tech.sql
---
# Expected Answer

### B-Tree (Balanced Tree)
A B-Tree index is a self-balancing tree data structure.
- **Root/Internal Nodes:** Contain "navigation" keys and pointers to the next level down.
- **Leaf Nodes:** Contain the actual data (Clustered Index) or pointers to the data rows (Non-Clustered Index).
- **Efficiency:** Search, insertion, and deletion are all O(log n).

### SARGability (Search ARGumentable)
A query is SARGable if the database engine can take advantage of an index to speed up the execution. Non-SARGable queries force a full table scan.

**Common SARGable Pitfalls:**
- **Functions on columns:** `WHERE YEAR(BirthDate) = 2020` is NOT SARGable. Use `WHERE BirthDate >= '2020-01-01' AND BirthDate < '2021-01-01'`.
- **Leading wildcards:** `WHERE Name LIKE '%Smith'` is NOT SARGable because the engine can't use the sorted nature of the index.
- **Data type mismatches:** If `ID` is a string but you query `WHERE ID = 123`, the engine might perform an implicit conversion on the column, breaking SARGability.

# Common Mistakes
- **Indexing everything:** Indexes speed up reads but slow down writes and take up disk space.
- **Composite Index Order:** Forgetting that an index on `(Lastname, Firstname)` cannot be used for a query on just `Firstname`.

# Follow-up Questions
- What is the "Left-Prefix Rule" in composite indexes?
- When would you use a Hash Index instead of a B-Tree? (Answer: For exact equality matches in memory-optimized tables).
