---
id: question.koa-static-files
title: Koa Static File Serving
slug: koa-static-files
difficulty: Medium
topic: topic.koa-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Koa uses external middleware for static content, which invites questions about deployment, cache policy, and safe public roots. This tests whether you know when the application should serve assets at all.

## Key Concepts

- Static serving is provided by middleware such as `koa-static`.
- Serve only from an explicit public directory.
- Hashed immutable assets and HTML entry points need different cache lifetimes.
- A CDN or reverse proxy is usually better for high-volume public assets.

## Question Variations

- "How do you configure a Koa public-assets directory?"
- "Why should hashed bundles have long cache headers?"
- "When should a CDN replace Koa static serving?"
