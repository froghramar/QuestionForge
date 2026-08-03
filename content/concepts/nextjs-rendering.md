---
id: concept.nextjs-rendering
title: Next.js Rendering Strategies
slug: nextjs-rendering
topic: topic.nextjs-fundamentals
description: Overview of SSR, SSG, and ISR in Next.js.
---
# Next.js Rendering Strategies

Next.js provides several ways to render your content, each with different performance characteristics and use cases.

### Static Site Generation (SSG)
Next.js generates the HTML at **build time**. The pre-rendered HTML is then reused on each request. It can be cached by a CDN.
- **Use case:** Marketing pages, blog posts, documentation.

### Server-Side Rendering (SSR)
Next.js generates the HTML on **each request**.
- **Use case:** Pages with highly dynamic data or user-specific content.

### Incremental Static Regeneration (ISR)
Enables you to use static generation on a per-page basis **without needing to rebuild the entire site**.
- **Use case:** Large scale sites with frequently updated data.
