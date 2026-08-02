---
id: question.angular-di-scopes
title: Angular Dependency Injection Scopes
slug: angular-di-scopes
difficulty: Hard
topic: topic.angular-fundamentals
concepts:
  - concept.angular-dependency-injection
estimated_time: 20
updated: 2026-08-02
---

## Why This Is Asked

Dependency Injection is a pillar of Angular's architecture. Interviewers ask about scopes (Root, Platform, Component, and Resolution Modifiers) to see if you understand how Angular manages service instances, memory, and state. Knowing how to correctly scope a service is critical for preventing memory leaks and ensuring data is shared (or isolated) correctly across the application.

## Key Concepts

- **Tree-shakeable Providers:** Using `providedIn: 'root'`.
- **Hierarchical Injectors:** The relationship between the Environment Injector and the Element Injector.
- **`providedIn: 'root'` vs. Module Providers:** Differences in singleton behavior and bundle size.
- **Resolution Modifiers:** `@Optional()`, `@SkipSelf()`, `@Self()`, and `@Host()`.

## Question Variations

- "What is the difference between providing a service in `root` versus providing it in a specific component?"
- "Explain the hierarchical nature of Angular's Injector system."
- "What do the `@SkipSelf()` and `@Host()` decorators do, and when would you use them?"
- "How can you create a service that is a singleton per lazy-loaded module but not for the whole app?"
