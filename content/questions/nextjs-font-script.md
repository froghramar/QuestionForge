---
id: question.nextjs-font-script
title: Font & Script Optimization
slug: nextjs-font-script
difficulty: Medium
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-font-script
estimated_time: 10
updated: 2026-08-03
---

## Why This Is Asked

Fonts and third-party scripts (like Analytics or Ads) are common causes of slow page loads and layout shifts. Interviewers want to see if you know how to use the framework's tools to mitigate these performance bottlenecks.

## Key Concepts

- **`next/font` and CLS:** How the framework handles fallback fonts and size adjustments.
- **Google Fonts vs Local Fonts:** The benefits of self-hosting at build time.
- **Script Loading Strategies:** When to use `beforeInteractive` vs `lazyOnload`.
- **Inline Scripts:** How to safely include scripts using the `Script` component.

## Question Variations

- "How does Next.js optimize Google Fonts?"
- "What is the benefit of using `next/font` over a standard CSS `@font-face`?"
- "How would you load a third-party analytics script without blocking the main thread?"
- "What is Cumulative Layout Shift and how do fonts contribute to it?"
