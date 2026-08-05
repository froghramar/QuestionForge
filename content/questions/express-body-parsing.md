---
id: question.express-body-parsing
title: Express Body Parsing
slug: express-body-parsing
difficulty: Medium
topic: topic.express-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Request parsing is an ordering and resource-management concern, not just a convenience call. Interviewers assess whether you know which inputs a parser handles, when to mount it, and why parsing alone does not make input safe.

## Key Concepts

- `express.json()` parses JSON only for matching content types.
- Parsers must run before routes that consume their output.
- Request size limits protect memory and processing capacity.
- Parsing, validation, and sanitization are separate steps.

## Question Variations

- "Why is `req.body` undefined in an Express route?"
- "What risk does an unlimited JSON body create?"
- "When would you use `express.urlencoded()`?"
