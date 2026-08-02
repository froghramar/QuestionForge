---
id: question.put-vs-patch
title: PUT vs PATCH
slug: put-vs-patch
difficulty: Easy
topic: topic.web-fundamentals
estimated_time: 8
updated: 2026-08-02
---

## Why This Is Asked

This tests your knowledge of RESTful API design. Understanding the difference between a full update (PUT) and a partial update (PATCH) is critical for building efficient and standards-compliant web services.

## Key Concepts

- **PUT**: Replaces the entire resource. If a field is omitted, it's typically nullified or reset to default.
- **PATCH**: Performs a partial update. Only the fields provided are changed; others remain as they were.
- **Idempotency**: PUT is idempotent (calling it multiple times with the same data yields the same result); PATCH can be but isn't always, depending on implementation.

## Question Variations

- "What is the difference between a `PUT` request and a `PATCH` request in REST?"
- "What does 'idempotency' mean in the context of HTTP methods, and which methods are idempotent?"
- "What happens in a `PUT` request if a required field is missing from the payload?"
- "When would you prefer `PATCH` over `PUT` for updating a user profile?"
