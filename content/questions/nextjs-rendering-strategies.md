---
id: question.nextjs-rendering-strategies
title: Next.js Rendering Strategies (SSR, SSG, ISR)
slug: nextjs-rendering-strategies
difficulty: Medium
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-rendering
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

Understanding the difference between Static Site Generation (SSG), Server-Side Rendering (SSR), and Incremental Static Regeneration (ISR) is fundamental to building performant and scalable Next.js applications. Interviewers want to see if you can choose the right strategy for a given set of requirements, balancing performance, SEO, and data freshness.

## Key Concepts

- **SSG (Static Site Generation):** Pre-rendering at build time.
- **SSR (Server-Side Rendering):** Pre-rendering on every request.
- **ISR (Incremental Static Regeneration):** Updating static content after build time without rebuilding the whole site.
- **Client-Side Rendering (CSR):** Rendering in the browser (standard React behavior).
- **Hybrid Rendering:** Mixing different strategies within the same application.

## Question Variations

- "What is the difference between `getStaticProps` and `getServerSideProps`?"
- "How does ISR work in Next.js?"
- "When would you use SSR over SSG?"
- "How does data fetching change between the Pages Router and the App Router?"
