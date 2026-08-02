---
id: concept.sql-identity
title: SQL Identity Functions
slug: sql-identity
topic: topic.database-fundamentals
description: Functions to retrieve the last generated identity value.
---
# SQL Identity Functions

In SQL Server, multiple functions exist to retrieve identity values, each with a different scope.

-   **@@IDENTITY**: Last identity value generated in the current session, across any scope.
-   **SCOPE_IDENTITY()**: Last identity value generated in the current session and current scope (e.g., within the same stored procedure or trigger).
-   **IDENT_CURRENT('TableName')**: Last identity value generated for a specific table in any session and any scope.
