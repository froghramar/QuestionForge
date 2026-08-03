---
id: question.astro-performance
title: Astro Performance Optimization
slug: astro-performance
difficulty: Hard
topic: topic.astro-fundamentals
concepts:
  - concept.astro-view-transitions
  - concept.astro-island-architecture
estimated_time: 20
updated: 2026-08-03
---

## Why This Is Asked
Astro is marketed as the "performance-first" framework. This question tests your depth of knowledge regarding the specific tools Astro provides to squeeze every millisecond out of the browser.

## Key Concepts
- **Image Optimization**: Using the built-in `<Image />` component for WebP/AVIF conversion.
- **Prefetching**: Strategies like `hover`, `tap`, and `viewport` to preload navigation data.
- **View Transitions**: Implementing seamless page changes without a full reload.
- **Script Optimization**: Using `is:inline` vs. standard bundled scripts.

## Question Variations
- "How does Astro handle image optimization and CLS (Cumulative Layout Shift)?"
- "Explain the different prefetching strategies available in Astro."
- "How do View Transitions affect the execution of scripts on a page?"
- "What are the trade-offs of using `client:only` components?"
