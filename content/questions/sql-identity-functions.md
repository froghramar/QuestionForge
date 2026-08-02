---
id: question.sql.identity-functions
title: "@@IDENTITY vs SCOPE_IDENTITY vs IDENT_CURRENT"
slug: sql-identity-functions
difficulty: Hard
topic: topic.database-fundamentals
concepts:
  - concept.sql-identity
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

This is a classic "gotcha" question. Choosing the wrong function can lead to bugs where triggers insert data and the calling code retrieves the wrong ID.

## Key Concepts

- **Scope**: Current block of execution.
- **Session**: Current connection.
- **Table Specificity**: Targeting a specific entity.

## Question Variations

- "What is the difference between `@@IDENTITY` and `SCOPE_IDENTITY()` in SQL Server?"
- "Why is `SCOPE_IDENTITY()` generally preferred over `@@IDENTITY`?"
- "When would you use `IDENT_CURRENT()` instead of the other two identity functions?"
- "Explain a scenario where `@@IDENTITY` would return an unexpected value (e.g., due to triggers)."
