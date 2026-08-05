---
id: question.koa-context-and-state
title: Koa Context and State
slug: koa-context-and-state
difficulty: Medium
topic: topic.koa-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Koa combines HTTP request and response operations in a per-request context object. This question tests whether you pass request-scoped data safely without relying on global mutable state.

## Key Concepts

- `ctx` is created per request and provides request and response helpers.
- `ctx.state` is the recommended namespace for data shared by middleware and handlers.
- `ctx.req` and `ctx.res` are raw Node objects and usually should not be written directly.
- Application-wide dependencies should not be mutable request state.

## Question Variations

- "Why use `ctx.state` rather than a module global for the authenticated user?"
- "When should you avoid writing to `ctx.res` directly?"
- "How can TypeScript type custom Koa state?"
