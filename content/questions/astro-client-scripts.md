---
id: question.astro-client-scripts
title: Client-Side Scripting in Astro
slug: astro-client-scripts
difficulty: Medium
topic: topic.astro-fundamentals
concepts:
  - concept.astro-scripts
estimated_time: 12
updated: 2026-08-03
---

## Why This Is Asked
Since Astro encourages minimal JavaScript, knowing how to properly add client-side behavior when needed is crucial. This question tests your knowledge of Astro's bundling system and script optimization.

## Key Concepts
- **Bundling**: How Astro handles multiple scripts on one page.
- **`is:inline`**: When and why would you bypass the Astro bundler?
- **`define:vars`**: Passing data from the server to a client-side `<script>`.
- **Event Handling**: Best practices for adding event listeners in an MPA environment.

## Question Variations
- "How do you pass a variable from the frontmatter to a client-side script?"
- "What happens if two different components include the same `<script>` tag?"
- "Why does a script sometimes fail to run after a View Transition?"
- "When should you use a client-side script instead of a framework island?"
---
