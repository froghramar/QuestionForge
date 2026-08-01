---
id: question.virtual-dom
title: Virtual DOM & Reconciliation
slug: virtual-dom-mechanism
difficulty: Medium
topic: topic.react-fundamentals
concepts:
  - concept.virtual-dom
estimated_time: 15
updated: 2026-08-01
---

## Why This Is Asked

Understanding the Virtual DOM is essential for reasoning about React performance. Interviewers want to see if you know why React uses an in-memory representation, how the diffing algorithm works, and what role keys play in efficient list reconciliation.

## Key Concepts

- The Virtual DOM is a lightweight JavaScript object tree mirroring the real DOM structure
- On state/prop change: React builds a new VDOM tree, diffs it against the previous one, and batches minimal DOM updates
- The diffing algorithm is O(n) thanks to two heuristics: elements of different types produce different trees, and keys identify stable children in lists
- Batching: multiple state updates in the same event handler are batched into a single re-render
- React Fiber (React 16+) enables interruptible rendering, prioritizing urgent updates over background work
