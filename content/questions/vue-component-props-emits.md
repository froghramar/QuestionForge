---
id: question.vue-component-props-emits
title: Typed props, emits, and v-model
slug: vue-component-props-emits
difficulty: Medium
topic: topic.vue-fundamentals
concepts:
  - concept.vue-component-contracts
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

This question tests whether you can design a component boundary that remains predictable as an application grows. Interviewers expect one-way prop flow, explicit events for parent-owned changes, and an understanding that component `v-model` is a prop-and-event convention that TypeScript can check.

## Key Concepts

- **One-way data flow:** Child components should not mutate props directly.
- **Typed contracts:** `defineProps` and `defineEmits` express the component's public API.
- **Component `v-model`:** Uses a model prop and a matching update event, commonly `modelValue` and `update:modelValue`.
- **`defineModel`:** Vue 3.4+ macro that declares the model contract with less boilerplate.

## Question Variations

- "Why is mutating a prop in a child component an anti-pattern?"
- "What does component `v-model` expand to?"
- "How do you type a custom emitted event?"
- "When would you use a named v-model?"
