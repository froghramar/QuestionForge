---
id: question.koa-routing
title: Koa Routing
slug: koa-routing
difficulty: Medium
topic: topic.koa-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Koa core intentionally does not include routing. Interviewers use this question to see whether you choose and compose middleware explicitly, including the router middleware needed for an API.

## Key Concepts

- Koa core is minimal and routing is supplied by middleware such as `@koa/router`.
- Router middleware should be registered before routes’ fallback behavior.
- Route parameters and query values are untrusted strings.
- Router prefixes help isolate API versions or resource areas.

## Question Variations

- "Why is there no router in Koa core?"
- "How do you mount a versioned API with `@koa/router`?"
- "Where should a Koa 404 fallback be registered?"
