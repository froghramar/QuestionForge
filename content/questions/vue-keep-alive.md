---
id: question.vue-keep-alive
title: Caching views with KeepAlive
slug: vue-keep-alive
difficulty: Medium
topic: topic.vue-fundamentals
concepts:
  - concept.vue-component-caching
  - concept.vue-lifecycle
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Interviewers use this to test state lifetime and performance judgment in dynamic interfaces. A strong answer explains that `KeepAlive` caches component instances, distinguishes deactivation from unmounting, and identifies cases where retaining state would be wasteful or incorrect.

## Key Concepts

- **Caching:** Inactive dynamic component instances remain in memory.
- **Activation hooks:** Cached instances use `onActivated` and `onDeactivated`.
- **Eviction:** `max`, `include`, and `exclude` control the cache.
- **Trade-off:** Retained state improves UX but consumes memory and can become stale.

## Question Variations

- "How does deactivation differ from unmounting?"
- "When should you avoid KeepAlive?"
- "How can you limit the number of cached views?"
