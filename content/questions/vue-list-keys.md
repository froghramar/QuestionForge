---
id: question.vue-list-keys
title: Stable keys in Vue lists
slug: vue-list-keys
difficulty: Easy
topic: topic.vue-fundamentals
concepts:
  - concept.vue-list-rendering
estimated_time: 10
updated: 2026-08-05
---

## Why This Is Asked

List rendering exposes whether a candidate understands component identity rather than just looping syntax. Interviewers look for stable, data-derived keys and an explanation of how index keys can preserve state on the wrong item after a reorder.

## Key Concepts

- **Identity:** A key identifies the same logical item across renders.
- **Stable IDs:** Database or domain IDs are preferred to array indexes.
- **State preservation:** Keys determine whether Vue reuses, moves, unmounts, or creates component instances.
- **Uniqueness:** Sibling keys must be unique.

## Question Variations

- "Why should a sortable list not use its index as a key?"
- "What happens when a key changes?"
- "When is an index key acceptable?"
