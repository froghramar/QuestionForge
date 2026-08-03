---
id: question.nextjs-middleware
title: Next.js Middleware
slug: nextjs-middleware
difficulty: Medium
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-middleware
estimated_time: 10
updated: 2026-08-03
---

## Why This Is Asked

Middleware is a powerful tool for handling cross-cutting concerns like authentication, geolocation, and redirects at the "edge." Interviewers want to see if you understand where Middleware sits in the request lifecycle and its limitations (like the Edge Runtime).

## Key Concepts

- **Edge Runtime:** Middleware runs in a restricted environment, not the full Node.js environment.
- **Request/Response Manipulation:** Rewriting URLs, redirecting, and setting headers.
- **The `middleware.ts` File:** Where it lives and how it's named.
- **Matchers:** How to target specific routes for Middleware execution.
- **Cookies & Headers:** How to read and write them in Middleware.

## Question Variations

- "How would you implement basic authentication using Next.js Middleware?"
- "What are the limitations of the Edge Runtime in Middleware?"
- "What is the difference between a `rewrite` and a `redirect` in Next.js?"
- "How do you apply Middleware only to certain routes?"
