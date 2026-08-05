---
id: question.koa-proxy-configuration
title: Koa Proxy Configuration
slug: koa-proxy-configuration
difficulty: Hard
topic: topic.koa-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Reverse-proxy configuration changes which client and transport data Koa trusts. This question probes whether you can deploy Koa safely behind TLS termination and load balancers.

## Key Concepts

- Koa uses proxy-related headers only when proxy support is enabled.
- Forwarded client IP headers are attacker-controlled unless the edge proxy sanitizes them.
- `proxyIpHeader` and `maxIpsCount` can narrow the trusted client-IP path.
- Proxy settings affect `ctx.ip`, `ctx.protocol`, redirects, and IP-based controls.

## Question Variations

- "Why might `ctx.secure` be false behind a TLS terminator?"
- "What can go wrong with `app.proxy = true`?"
- "How do you safely obtain a client IP behind one proxy?"
