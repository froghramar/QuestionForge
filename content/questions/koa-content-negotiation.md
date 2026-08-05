---
id: question.koa-content-negotiation
title: Koa Content Negotiation
slug: koa-content-negotiation
difficulty: Medium
topic: topic.koa-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Koa exposes HTTP negotiation helpers directly on the context. This question tests whether you distinguish client request formats from accepted response formats and implement predictable HTTP behavior.

## Key Concepts

- `Content-Type` describes a representation sent in a request or response.
- `Accept` declares response representations the client can handle.
- `ctx.accepts()` selects from explicitly supported representations.
- 415 and 406 represent different media-type failures.

## Question Variations

- "How do `Accept` and `Content-Type` differ in Koa?"
- "When should an API return 406?"
- "How can Koa return JSON or text based on client preference?"
