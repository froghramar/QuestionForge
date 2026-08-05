---
id: question.express-security-basics
title: Express Security Basics
slug: express-security-basics
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

An Express application exposes Node.js and application data directly to the network. This question checks whether you can layer protections instead of relying on a single package or header.

## Key Concepts

- Security headers, transport security, input validation, and authorization address different threats.
- CORS controls browser cross-origin access; it is not authentication or a server-side access-control mechanism.
- Rate limits must be scoped and backed by shared state when the application is horizontally scaled.
- Secrets and detailed error information must not be returned to clients.

## Question Variations

- "What does Helmet protect, and what does it not protect?"
- "Why is a permissive CORS configuration risky with credentialed requests?"
- "How does a multi-instance deployment change rate limiting?"
