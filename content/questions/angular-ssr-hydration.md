---
id: question.angular-ssr-hydration
title: "Client-side Hydration vs. Traditional SSR"
slug: angular-ssr-hydration
difficulty: Hard
topic: topic.angular-fundamentals
concepts:
  - concept.angular-ssr-hydration
estimated_time: 20
updated: 2026-08-02
---

## Why This Is Asked

With Angular 17+ making SSR a first-class citizen in the CLI, understanding how hydration works is vital for performance-conscious developers. Interviewers want to know if you understand the "flicker" problem that traditional SSR had and how modern hydration solves it. They also want to test your awareness of common pitfalls like direct DOM manipulation that can break hydration.

## Key Concepts

- **Flicker (Destructive Hydration):** Why old versions of Angular SSR were less performant on the client.
- **Non-destructive Hydration:** Reusing the DOM nodes.
- **DOM Mismatch:** What happens when the server and client render different things.
- **`ngSkipHydration`:** How to opt-out specific components from hydration.
- **Browser-only APIs:** Handling `window` or `document` safely in an SSR environment.

## Question Variations

- "What is the difference between traditional SSR and modern Hydration in Angular?"
- "What common mistakes can break the hydration process in an Angular application?"
- "How do you handle components that rely on browser-only APIs like `localStorage` in an SSR environment?"
- "What is the `ngSkipHydration` attribute used for, and when should you use it?"

