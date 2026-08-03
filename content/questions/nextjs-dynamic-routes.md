---
id: question.nextjs-dynamic-routes
title: Next.js Dynamic Routes & `generateStaticParams`
slug: nextjs-dynamic-routes
difficulty: Medium
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-app-router
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

Most real-world applications require dynamic routes (e.g., `/blog/[slug]`). Interviewers want to know if you understand how to pre-render these pages at build time using `generateStaticParams` (the App Router's equivalent of `getStaticPaths`) and how `dynamicParams` affects fallback behavior.

## Key Concepts

- **Dynamic Segments:** The `[slug]` folder naming convention.
- **`generateStaticParams`:** How to provide a list of routes to be pre-rendered at build time.
- **`dynamicParams`:** Controlling what happens when a route is visited that wasn't generated at build time (equivalent to `fallback` in Pages Router).
- **Catch-all Routes:** Using `[...slug]` and `[[...slug]]`.

## Question Variations

- "How do you pre-render dynamic routes in the App Router?"
- "What is the difference between `generateStaticParams` and `getStaticPaths`?"
- "How do you handle a scenario where a user visits a dynamic route that wasn't generated at build time?"
- "What is a catch-all route and when would you use one?"
