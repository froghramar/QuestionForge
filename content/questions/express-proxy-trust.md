---
id: question.express-proxy-trust
title: Express Proxy Trust
slug: express-proxy-trust
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Most deployed Express services sit behind a reverse proxy or load balancer. This question tests whether you know which forwarding headers are trustworthy and how a bad proxy configuration can affect security-sensitive logic.

## Key Concepts

- Proxies commonly add `X-Forwarded-For` and `X-Forwarded-Proto` headers.
- `trust proxy` controls whether Express uses those headers for values such as `req.ip` and `req.secure`.
- Trust only known network hops, not arbitrary client-provided forwarding headers.
- Correct proxy trust is required for secure-cookie and client-IP based policies behind TLS termination.

## Question Variations

- "Why might `req.secure` be false behind a TLS load balancer?"
- "What security issue can an overly broad `trust proxy` setting cause?"
- "How should proxy trust be configured in a multi-proxy deployment?"
