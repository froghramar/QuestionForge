---
id: question.nextjs-route-handlers
title: Next.js Route Handlers (API Routes)
slug: nextjs-route-handlers
difficulty: Medium
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-route-handlers
estimated_time: 10
updated: 2026-08-03
---

## Why This Is Asked

Even with Server Actions, API routes are still necessary for external integrations, webhooks, and complex data processing. Interviewers want to know if you can build robust APIs using the modern Web APIs that Next.js now favors over the older Node.js `req/res` objects.

## Key Concepts

- **Web Request/Response APIs:** Using standard web objects instead of Node.js-specific ones.
- **Dynamic vs Static Handlers:** Understanding when a Route Handler is cached.
- **Middleware Integration:** How Middleware interacts with Route Handlers.
- **URL Parameters:** Accessing `params` in dynamic route handlers.

## Question Variations

- "How do you create an API endpoint in the Next.js App Router?"
- "What is the difference between Route Handlers and Pages Router API Routes?"
- "Are Route Handlers cached by default?"
- "How do you handle different HTTP methods in a single `route.ts` file?"
