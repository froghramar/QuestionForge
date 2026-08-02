---
id: question.react-key-prop
title: Why React needs the key prop
slug: react-key-prop
difficulty: Easy
topic: topic.react-fundamentals
concepts:
  - concept.virtual-dom
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Understanding the `key` prop is essential for building performant React applications. Interviewers use this to gauge your knowledge of React's reconciliation algorithm and your awareness of common bugs related to list rendering, such as state being preserved in the wrong components.

## Key Concepts

- **Reconciliation:** The process by which React updates the DOM.
- **Diffing Algorithm:** React compares the new element tree with the previous one.
- **Identity:** `key` helps React identify which items have changed, are added, or are removed.
- **Stability:** Stable keys allow React to reuse existing DOM elements and component instances.
