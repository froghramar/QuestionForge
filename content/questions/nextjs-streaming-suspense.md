---
id: question.nextjs-streaming-suspense
title: Next.js Streaming & Suspense
slug: nextjs-streaming-suspense
difficulty: Hard
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-streaming
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

Streaming is a core feature of the App Router that directly impacts Core Web Vitals and user perception of speed. Interviewers want to know if you can architect a page that stays responsive even when backend services are slow.

## Key Concepts

- **Time to First Byte (TTFB) vs Largest Contentful Paint (LCP):** How streaming affects these metrics.
- **`loading.js`:** The convention-based approach to loading states.
- **Granular Suspense:** Using `<Suspense>` to wrap specific slow-loading components.
- **SEO:** Understanding that Next.js waits for the first chunk (including metadata) to be generated before sending anything to search engines.

## Question Variations

- "How does streaming improve the performance of a Next.js application?"
- "What is the difference between `loading.js` and manual `<Suspense>` boundaries?"
- "Does streaming affect SEO?"
- "How do you handle a page where one component fetches data significantly slower than others?"
