---
id: question.koa-sessions-and-cookies
title: Koa Sessions and Cookies
slug: koa-sessions-and-cookies
difficulty: Hard
topic: topic.koa-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Session handling tests browser security knowledge and Koa-specific cookie APIs. Interviewers want to see cookie flags, key rotation, and an understanding of server-side state at scale.

## Key Concepts

- `ctx.cookies` reads and writes cookies; signed cookies require configured `app.keys`.
- `HttpOnly`, `Secure`, and `SameSite` have different protections.
- Server-side sessions need a shared store in multi-instance deployments.
- Rotate identifiers on authentication and expire sessions deliberately.

## Question Variations

- "What is `app.keys` used for in Koa?"
- "Why are signed cookies not encrypted cookies?"
- "Why does a local session store fail behind a load balancer?"
