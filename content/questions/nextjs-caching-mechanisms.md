---
id: question.nextjs-caching-mechanisms
title: Next.js Caching Mechanisms
slug: nextjs-caching-mechanisms
difficulty: Hard
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-caching
estimated_time: 20
updated: 2026-08-03
---

## Why This Is Asked

The App Router introduced a complex multi-layered caching system. Understanding how to manage, opt-out of, and revalidate these caches is critical for building apps that are both fast and show fresh data. Interviewers want to see if you can debug "stale data" issues effectively.

## Key Concepts

- **Request Memoization vs Data Cache:** Understanding that one is per-request and the other is persistent.
- **Opting out of Caching:** `cache: 'no-store'`, `revalidate = 0`, or using dynamic functions.
- **Revalidation:** On-demand (`revalidateTag`, `revalidatePath`) vs Time-based.
- **Router Cache:** How it affects client-side navigation and how to clear it (`router.refresh()`).

## Question Variations

- "What are the four layers of caching in Next.js?"
- "How do you disable caching for a specific `fetch` request?"
- "What is the difference between Request Memoization and the Data Cache?"
- "How does `router.refresh()` interact with the server-side caches?"
