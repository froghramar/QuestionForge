---
id: question.vue-lifecycle-hooks
title: Vue lifecycle hooks and cleanup
slug: vue-lifecycle-hooks
difficulty: Medium
topic: topic.vue-fundamentals
concepts:
  - concept.vue-lifecycle
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

This assesses whether a candidate can attach browser or third-party work to the correct component lifetime. Interviewers expect a distinction between setup-time reactive logic, mounted DOM access, and unmounted cleanup, including why hooks must be registered synchronously.

## Key Concepts

- **`onMounted`:** Runs after the component's DOM has been inserted on the client.
- **`onUnmounted`:** Releases listeners, timers, subscriptions, and external resources.
- **SSR:** Mounted hooks do not run during server-side rendering.
- **Synchronous registration:** Lifecycle hooks must be called during setup, before an `await` boundary.

## Question Variations

- "Where should a component register and remove a window event listener?"
- "Does `onMounted` run during SSR?"
- "Why can calling `onUnmounted` after an await fail?"
