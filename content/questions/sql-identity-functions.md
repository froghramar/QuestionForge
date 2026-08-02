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
