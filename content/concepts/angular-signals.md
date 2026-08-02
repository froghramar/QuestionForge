---
id: concept.angular-signals
title: Angular Signals
slug: angular-signals
topic: topic.angular-fundamentals
description: Fine-grained reactivity system in modern Angular.
---
# Angular Signals
Signals are a reactive primitive that provides fine-grained reactivity in Angular. They allow Angular to track state changes more precisely, leading to better performance and a more intuitive developer experience.

Key features:
- **Fine-grained updates:** Only the parts of the UI that depend on a signal are updated when its value changes.
- **Glitch-free:** Prevents unnecessary re-computations and ensures data consistency.
- **Computed Signals:** Derive state from other signals with automatic dependency tracking.
- **Effects:** Run side-effecting code when signal values change.
- **Signal Forms (v22 Stable):** A lightweight, reactive form system built entirely on signals, offering better type safety and simpler validation than traditional Reactive Forms.
