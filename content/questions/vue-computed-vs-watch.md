---
id: question.vue-computed-vs-watch
title: computed vs watch
slug: vue-computed-vs-watch
difficulty: Medium
topic: topic.vue-fundamentals
concepts:
  - concept.vue-derived-state
  - concept.vue-reactivity
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Interviewers ask this to distinguish declarative data modeling from imperative side-effect code. A strong candidate uses computed properties for values rendered from state and reserves watchers for work such as network requests, persistence, or integration with non-Vue APIs.

## Key Concepts

- **Computed properties:** Cached, read-only by default derived values that track their dependencies.
- **Watchers:** Run a callback after a specified source changes and are intended for side effects.
- **`watchEffect`:** Automatically tracks dependencies read during its synchronous execution.
- **Async safety:** Watchers should cancel or invalidate stale asynchronous work.

## Question Variations

- "Why should a computed getter not make an HTTP request?"
- "What is the difference between `watch` and `watchEffect`?"
- "When does a computed property recompute?"
- "How do you prevent an earlier request from overwriting newer watch results?"
