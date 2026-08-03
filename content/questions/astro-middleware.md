---
id: question.astro-middleware
title: Middleware in Astro
slug: astro-middleware
difficulty: Hard
topic: topic.astro-fundamentals
concepts:
  - concept.astro-middleware
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked
Middleware is a critical part of any production web framework. Interviewers ask this to see if you understand how to handle cross-cutting concerns like authentication and security in a server-side environment.

## Key Concepts
- **`onRequest`**: The core function that intercepts every request.
- **Context Object**: Accessing `locals`, `cookies`, `request`, and `redirect`.
- **Chaining**: Using `sequence()` to run multiple middleware functions in order.
- **Locals**: How to pass data from middleware to individual Astro components.

## Question Variations
- "How do you protect a route from unauthorized access in Astro?"
- "What is the `locals` object and how do you use it?"
- "Can you use middleware in a static (SSG) Astro site?"
- "Explain the order of execution between middleware, page rendering, and API routes."
