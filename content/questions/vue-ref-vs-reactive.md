---
id: question.vue-ref-vs-reactive
title: ref vs reactive
slug: vue-ref-vs-reactive
difficulty: Easy
topic: topic.vue-fundamentals
concepts:
  - concept.vue-reactivity
estimated_time: 10
updated: 2026-08-05
---

## Why This Is Asked

This question checks whether a candidate understands Vue's reactive primitives instead of only memorizing template syntax. Interviewers look for the practical distinction between a replaceable value held by a ref and a proxy for an object, plus awareness of destructuring and reassignment pitfalls.

## Key Concepts

- **`ref`:** Wraps any value and exposes it through `.value` in TypeScript code.
- **`reactive`:** Returns a proxy for non-primitive objects and arrays.
- **Replacement:** A ref can replace its whole value; a reactive binding cannot be reassigned without losing the proxy.
- **Destructuring:** Destructuring reactive properties loses reactivity unless `toRefs` or `toRef` is used.

## Question Variations

- "Why does Vue use `.value` for refs in TypeScript code?"
- "Can `reactive` hold a primitive value?"
- "What happens when you destructure a reactive object?"
- "When should you use `toRef`?"
