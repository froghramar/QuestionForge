---
id: question.angular-modern-lifecycles
title: "Modern Lifecycle Hooks: afterRender vs. ngAfterViewInit"
slug: angular-modern-lifecycles
difficulty: Medium
topic: topic.angular-advanced
concepts:
  - concept.angular-modern-lifecycles
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

With the stabilization of SSR and Hydration in Angular 17+, traditional lifecycle hooks like `ngAfterViewInit` are no longer sufficient for all DOM-related tasks. Interviewers want to know if you understand how to write "SSR-safe" code. They want to test your knowledge of when these new hooks run (relative to the browser's paint cycle) and why they are safer and more performant than the legacy alternatives for tasks like measurement or third-party library initialization.

## Key Concepts

- **SSR Safety:** Why `ngAfterViewInit` can be dangerous in SSR.
- **Render/Layout Phase:** When these hooks execute relative to the browser.
- **One-time vs. Perpetual:** Choosing between `afterNextRender` and `afterRender`.
- **Zoneless Context:** How these hooks work in applications without `Zone.js`.
- **Phase Control:** Understanding the `early`, `mixed`, and `layout` phases of the hooks.

## Question Variations

- "What is the difference between `afterRender` and `ngAfterViewInit`?"
- "Why should you avoid using `ngAfterViewInit` for DOM measurements in a Server-Side Rendered (SSR) application?"
- "When would you choose `afterNextRender` instead of `afterRender`?"
- "How do the new render hooks help in improving the performance of third-party library initializations?"

