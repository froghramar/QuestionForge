---
id: question.nextjs-image-optimization
title: Next.js Image Optimization (`next/image`)
slug: nextjs-image-optimization
difficulty: Easy
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-image-optimization
estimated_time: 10
updated: 2026-08-03
---

## Why This Is Asked

Images are often the largest assets on a webpage. Next.js provides a built-in solution that handles many complex optimization tasks automatically. Interviewers want to see if you know how to use it correctly and why it's better than a standard `<img>` tag.

## Key Concepts

- **LCP and CLS:** How the component helps these specific metrics.
- **Priority:** Using the `priority` prop for above-the-fold images.
- **Layout Strategies:** `width/height` vs `fill`.
- **Remote Images:** Configuring `next.config.js` to allow external domains.
- **Placeholders:** Using `blur` placeholders for better UX.

## Question Variations

- "Why should you use `next/image` instead of a standard `<img>` tag?"
- "How do you handle images when you don't know the aspect ratio beforehand?"
- "What is the purpose of the `priority` attribute?"
- "How does Next.js prevent Cumulative Layout Shift with images?"
