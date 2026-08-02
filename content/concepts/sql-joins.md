---
id: concept.sql-joins
title: SQL Joins
slug: sql-joins
topic: topic.database-fundamentals
description: Combining rows from two or more tables based on a related column.
---
# SQL Joins

Joins are used to combine data from different tables in a relational database. The relationship is usually defined by a foreign key in one table pointing to a primary key in another.

## Join Types

1.  **INNER JOIN**: Returns records that have matching values in both tables.
2.  **LEFT (OUTER) JOIN**: Returns all records from the left table, and the matched records from the right table.
3.  **RIGHT (OUTER) JOIN**: Returns all records from the right table, and the matched records from the left table.
4.  **FULL (OUTER) JOIN**: Returns all records when there is a match in either left or right table.
5.  **CROSS JOIN**: Returns the Cartesian product of the two tables (every row from table A joined with every row from table B).
6.  **SELF JOIN**: A regular join, but the table is joined with itself.
