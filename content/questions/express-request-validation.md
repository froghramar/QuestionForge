---
id: question.express-request-validation
title: Express Request Validation
slug: express-request-validation
difficulty: Medium
topic: topic.express-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

External HTTP input is untrusted, even when it comes from a first-party client. This question tests whether you reject malformed data at the boundary and keep handlers focused on valid domain operations.

## Key Concepts

- Validate `params`, `query`, headers, and body data at the API boundary.
- Parsing JSON and validating its shape are separate responsibilities.
- Return consistent client-safe errors for invalid input.
- Validation should permit only the data the endpoint expects.

## Question Variations

- "Why is `express.json()` not sufficient input validation?"
- "Where should request validation run in an Express application?"
- "How do you distinguish a malformed request from a domain conflict?"
