---
id: question.astro-islands
title: Island Architecture in Astro
slug: astro-islands
difficulty: Medium
topic: topic.astro-fundamentals
concepts:
  - concept.astro-island-architecture
estimated_time: 10
updated: 2026-08-03
---

## Why This Is Asked
Astro's primary innovation is its implementation of Island Architecture. Interviewers ask this to see if you understand how Astro differs from traditional Single Page Applications (SPAs) and how it achieves superior performance by default.

## Key Concepts
- **Partial Hydration**: Only specific components are "woken up" with JavaScript.
- **Client Directives**: Using `client:load`, `client:visible`, etc., to control when JS is executed.
- **Framework Agnosticism**: Using React, Vue, Svelte, and Solid components on the same page.
- **Total Isolation**: Islands do not share state by default (unless using a store like Nanostores).

## Question Variations
- "How does Astro's hydration model differ from React's?"
- "What are client directives and when should you use each one?"
- "Can you use two different UI frameworks in one Astro page? How?"
- "Explain the performance benefits of Island Architecture."
