---
id: question.nextjs-static-vs-dynamic
title: Static vs. Dynamic Rendering
slug: nextjs-static-vs-dynamic
difficulty: Medium
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-static-vs-dynamic
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

Understanding when a route becomes dynamic is crucial for performance and debugging. If you expect a page to be fast and cached but accidentally use a dynamic function, your server load will increase. Interviewers want to see if you can control the rendering behavior of your segments.

## Key Concepts

- **Automatic Selection:** How Next.js decides between static and dynamic.
- **Dynamic Functions:** `cookies()`, `headers()`, and `searchParams`.
- **Segment Config:** Using `force-dynamic`, `force-static`, `error`, and `auto`.
- **Impact on Caching:** How dynamic rendering affects the Full Route Cache.

## Question Variations

- "How does Next.js decide whether to render a route statically or dynamically?"
- "What happens to the cache when you use the `cookies()` function?"
- "How can you force a route to always be dynamic even if it has no dynamic functions?"
- "What is the difference between `dynamic = 'force-dynamic'` and `revalidate = 0`?"
