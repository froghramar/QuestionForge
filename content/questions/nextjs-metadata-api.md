---
id: question.nextjs-metadata-api
title: Next.js Metadata API
slug: nextjs-metadata-api
difficulty: Easy
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-metadata
estimated_time: 10
updated: 2026-08-03
---

## Why This Is Asked

SEO is a primary reason developers choose Next.js. The App Router replaced the old `<Head>` component with a more robust, server-side Metadata API. Interviewers want to see if you can manage SEO effectively, especially for dynamic pages like products or blog posts.

## Key Concepts

- **Static vs Dynamic Metadata:** When to use the object vs the function.
- **Metadata Merging:** How child metadata overrides parent metadata.
- **OpenGraph & Twitter:** Setting up social media previews.
- **`generateMetadata`:** Fetching data to populate tags.
- **Ordering:** The fact that `generateMetadata` can be async.

## Question Variations

- "How do you handle SEO in the Next.js App Router?"
- "What is the difference between the `metadata` object and `generateMetadata`?"
- "How do you set a dynamic title for a blog post route?"
- "How does Next.js handle conflicting metadata between a layout and a page?"
