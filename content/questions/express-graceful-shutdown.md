---
id: question.express-graceful-shutdown
title: Express Graceful Shutdown
slug: express-graceful-shutdown
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Stopping a Node process safely is an operational concern that appears in production and containerized deployments. Interviewers assess whether you protect in-flight requests and dependent resources during termination.

## Key Concepts

- Stop accepting new connections before closing application dependencies.
- Let in-flight requests finish within a bounded timeout.
- Handle `SIGTERM` and `SIGINT` idempotently.
- Readiness should fail before a process is removed from service.

## Question Variations

- "What should an Express service do when it receives `SIGTERM`?"
- "Why can calling `process.exit()` immediately lose requests?"
- "How does readiness relate to graceful shutdown?"
