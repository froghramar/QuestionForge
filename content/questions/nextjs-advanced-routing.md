---
id: question.nextjs-advanced-routing
title: Parallel & Intercepting Routes
slug: nextjs-advanced-routing
difficulty: Expert
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-advanced-routing
estimated_time: 20
updated: 2026-08-03
---

## Why This Is Asked

These features allow for high-end UX patterns that were previously very difficult to implement in React frameworks. Interviewers want to see if you can handle complex stateful routing, like a photo gallery where the URL updates when a modal opens, but the background page stays visible.

## Key Concepts

- **Slots (`@slotname`):** How they are passed to the layout as props.
- **`default.js`:** The importance of providing a fallback for parallel routes.
- **Intercepting Syntax:** `(.)`, `(..)`, `(..)(..)`, and `(...)`.
- **Soft vs Hard Navigation:** How intercepting routes behave differently when clicking a link vs. a full page refresh.

## Question Variations

- "How do you implement a modal that has its own URL in Next.js?"
- "What are parallel routes and what problem do they solve?"
- "Why is `default.js` necessary when using parallel routes?"
- "Explain the difference between `(.)` and `(..)` in intercepting routes."
