---
id: question.nextjs-app-vs-pages-router
title: Next.js App Router vs Pages Router
slug: nextjs-app-vs-pages-router
difficulty: Hard
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-app-router
estimated_time: 20
updated: 2026-08-03
---

## Why This Is Asked

The transition from the Pages Router to the App Router represents a major shift in how Next.js (and React) applications are architected. Interviewers want to know if you understand the underlying technical differences — specifically React Server Components (RSC) — and the trade-offs involved in migrating or starting a new project.

## Key Concepts

- **React Server Components (RSC):** The foundation of the App Router, allowing components to stay on the server.
- **Client vs Server Components:** Understanding the `'use client'` directive.
- **Nested Layouts:** The folder structure change and how layouts are preserved across navigations.
- **Data Fetching:** The move from `getStaticProps`/`getServerSideProps` to async/await in Server Components.
- **Streaming & Suspense:** How the App Router handles partial page loading.

## Question Variations

- "What are React Server Components and why are they important in Next.js?"
- "How do you handle state management in the App Router?"
- "What is the `'use client'` directive?"
- "Can you nest a Server Component inside a Client Component?"
