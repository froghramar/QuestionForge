---
id: question.express-content-negotiation
title: Express Content Negotiation
slug: express-content-negotiation
difficulty: Medium
topic: topic.express-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

HTTP clients and APIs communicate through more than JSON bodies. This question checks whether you can use request and response media types correctly and return meaningful errors for incompatible representations.

## Key Concepts

- `Content-Type` describes the request or response representation.
- `Accept` declares representations a client can receive.
- `req.accepts()` helps select a supported response type.
- Return 415 for unsupported request media types and 406 when no acceptable response representation is available.

## Question Variations

- "What is the difference between `Accept` and `Content-Type`?"
- "When should an API return 415 Unsupported Media Type?"
- "How can an Express route return JSON or text based on the client?"
