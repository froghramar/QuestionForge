---
id: question.astro-component-syntax
title: Astro Component Architecture
slug: astro-component-syntax
difficulty: Easy
topic: topic.astro-fundamentals
concepts:
  - concept.astro-components
estimated_time: 10
updated: 2026-08-03
---

## Why This Is Asked
Understanding the boundary between server-side logic and client-side templates is the most fundamental skill in Astro. Interviewers want to ensure you know what code runs where and how to structure a basic component.

## Key Concepts
- **Frontmatter**: What kind of code belongs between the `---` fences?
- **Scoped Styles**: How does Astro prevent CSS leakage without using Shadow DOM?
- **Slots**: Using named slots vs. default slots for layout patterns.
- **Fragment Syntax**: Using `<>` for multiple root elements.

## Question Variations
- "Explain the lifecycle of an Astro component."
- "How do you pass data from a parent component to a child component?"
- "Can you use `console.log` in the frontmatter? Where does it output?"
- "What is the difference between a `.astro` component and a `.jsx` component?"
