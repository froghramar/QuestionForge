---
id: question.vue-slots
title: Slots and scoped slots
slug: vue-slots
difficulty: Medium
topic: topic.vue-fundamentals
concepts:
  - concept.vue-slots
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

This tests component API design and the difference between content composition and prop configuration. A strong answer explains default and named slots, then describes scoped slots as child-provided data rendered by parent-owned content.

## Key Concepts

- **Default slots:** Parent content rendered at a child-defined location.
- **Named slots:** Explicit regions such as header, body, and footer.
- **Scoped slots:** The child exposes data for the parent slot content to render.
- **Ownership:** Slot content is evaluated in the parent's scope.

## Question Variations

- "When should a component use a slot instead of a prop?"
- "Who owns the scope of slot content?"
- "How do named slots differ from scoped slots?"
