---
id: question.vue-async-components-suspense
title: Async components and Suspense
slug: vue-async-components-suspense
difficulty: Hard
topic: topic.vue-fundamentals
concepts:
  - concept.vue-async-components
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

This evaluates practical code-splitting and asynchronous rendering knowledge. Interviewers want candidates to distinguish lazy loading a component's code from waiting for asynchronous setup, and to explain where loading and error states belong in a resilient UI.

## Key Concepts

- **`defineAsyncComponent`:** Defers loading a component implementation.
- **`Suspense`:** Coordinates nested async dependencies and fallback content.
- **Error boundaries:** Async component loaders can provide an error component and retry logic.
- **UX:** Loading boundaries should be placed around meaningful, independently useful parts of a page.

## Question Variations

- "What is the difference between an async component and an async setup function?"
- "How does Suspense decide when to hide its fallback?"
- "How would you retry a failed dynamic import?"
