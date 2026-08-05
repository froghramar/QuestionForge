---
id: question.koa-response-handling
title: Koa Response Handling
slug: koa-response-handling
difficulty: Medium
topic: topic.koa-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Koa’s response abstraction sets defaults based on the body and status. Interviewers use this topic to assess whether you can produce correct API responses without bypassing the framework’s lifecycle.

## Key Concepts

- Set `ctx.status`, `ctx.body`, headers, and type through the Koa context.
- Objects and arrays are JSON serialized by Koa.
- Koa defaults to 404 until a response body or status changes it.
- Writing to raw `ctx.res` bypasses Koa and is generally unsupported.

## Question Variations

- "What happens when a Koa handler sets `ctx.body` to an object?"
- "Why should you avoid `ctx.res.end()`?"
- "How do you return 204 correctly from a Koa route?"
