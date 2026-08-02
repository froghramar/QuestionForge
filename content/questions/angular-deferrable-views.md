---
id: question.angular-deferrable-views
title: "Performance Optimization with Deferrable Views (@defer)"
slug: angular-deferrable-views
difficulty: Medium
topic: topic.angular-fundamentals
concepts:
  - concept.angular-deferrable-views
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

`@defer` is one of the most powerful performance tools in the modern Angular developer's arsenal. Interviewers ask this to see if you understand how to optimize the Core Web Vitals of an application, specifically by deferring non-critical components. They also want to test your knowledge of the different trigger types and how `@defer` interacts with SSR and hydration.

## Key Concepts

- **Bundle Size Optimization:** How `@defer` affects the main bundle vs. lazy chunks.
- **Triggers:** Choosing the right trigger (`viewport` vs. `hover` vs. `interaction`).
- **Prefetching:** Using `prefetch` to load dependencies before they are needed.
- **SSR Behavior:** How deferred blocks are rendered on the server.
- **Hydration:** Interaction between deferred content and non-destructive hydration.

## Question Variations

- "How does `@defer` work, and what problem does it solve in Angular applications?"
- "Explain the difference between `on viewport` and `on idle` triggers in `@defer`."
- "What is the purpose of the `prefetch` keyword, and when should you use it?"
- "How do you handle error or loading states when using deferrable views?"

