---
id: question.express-5-migration
title: Express 5 Migration
slug: express-5-migration
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Framework upgrades expose whether a candidate reads migration guidance, tests behavior, and distinguishes a version change from a mechanical dependency bump. Express 5 has behavior and platform changes that can affect existing applications.

## Key Concepts

- Express 5 requires Node.js 18 or later.
- Rejected promises from route handlers and middleware are forwarded to error handling.
- Route-pattern syntax changed with the newer `path-to-regexp` dependency.
- Upgrade work should include integration tests for routes, errors, and middleware order.

## Question Variations

- "What should you test first after upgrading an Express 4 application to Express 5?"
- "How did promise rejection handling change in Express 5?"
- "Why can a wildcard route need changes during migration?"
