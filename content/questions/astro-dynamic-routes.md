---
id: question.astro-dynamic-routes
title: Dynamic Routing & getStaticPaths
slug: astro-dynamic-routes
difficulty: Medium
topic: topic.astro-fundamentals
concepts:
  - concept.astro-dynamic-routing
estimated_time: 12
updated: 2026-08-03
---

## Why This Is Asked
Routing is the backbone of any framework. Interviewers want to know if you can handle complex URL structures and efficient data fetching in a build-time environment.

## Key Concepts
- **Rest parameters**: Using `[...path].astro` for catch-all routes.
- **Return Type**: The specific object structure required by `getStaticPaths` (an array of objects with `params` and `props`).
- **Performance**: Passing `props` from `getStaticPaths` to avoid redundant database calls.
- **Pagination**: Using the built-in `paginate()` helper.

## Question Variations
- "How do you create a catch-all route in Astro?"
- "What is the difference between `Astro.params` and `Astro.props` in a dynamic route?"
- "How do you handle pagination for a blog with hundreds of posts?"
- "Can `getStaticPaths` be asynchronous?"
---
