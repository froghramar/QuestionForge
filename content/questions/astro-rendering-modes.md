---
id: question.astro-rendering-modes
title: Astro SSR vs. Hybrid Rendering
slug: astro-rendering-modes
difficulty: Medium
topic: topic.astro-fundamentals
concepts:
  - concept.astro-adapters
  - concept.astro-rendering-modes
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked
Understanding how to scale an Astro site from a simple blog (SSG) to a complex app (SSR) is a vital skill. This question tests your knowledge of how Astro handles server-side logic and platform-specific deployments.

## Key Concepts
- **`output: 'server'`**: Every route is rendered on-demand.
- **`output: 'hybrid'`**: Routes are static by default, but specific pages can be marked for SSR.
- **`export const prerender = false`**: The opt-out mechanism for hybrid rendering.
- **Adapters**: Why they are necessary and how to configure them.

## Question Variations
- "When would you choose Hybrid rendering over pure SSR?"
- "How do you configure an Astro site to run on a Node.js server vs. Vercel Edge?"
- "What happens to `getStaticPaths` when you switch a route to SSR?"
- "Can you use cookies in a static Astro page?"
