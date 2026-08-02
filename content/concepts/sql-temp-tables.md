---
id: concept.sql-temp-tables
title: SQL Temporary Tables
slug: sql-temp-tables
topic: topic.database-fundamentals
description: Tables that exist temporarily on the database server.
---
# SQL Temporary Tables

Temporary tables are useful for storing intermediate result sets that are accessed multiple times within a session or procedure.

## Types of Temporary Tables (SQL Server)

-   **Local Temporary Tables (`#TableName`)**: Visible only to the current session and deleted when the session ends.
-   **Global Temporary Tables (`##TableName`)**: Visible to all sessions and deleted when the creating session ends and all other sessions referencing it are closed.
