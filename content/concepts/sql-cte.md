---
id: concept.sql-cte
title: Common Table Expressions (CTE)
slug: sql-cte
topic: topic.database-fundamentals
description: Temporary named result sets that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement.
---
# Common Table Expressions (CTE)

A CTE is a temporary result set defined within the execution scope of a single query. It improves readability and supports recursion.

## Syntax
```sql
WITH CTEName AS (
    SELECT ...
)
SELECT * FROM CTEName;
```
