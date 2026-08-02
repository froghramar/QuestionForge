---
id: question.angular-signals-vs-observables
title: Angular Signals vs. Observables (RxJS)
slug: angular-signals-vs-observables
difficulty: Medium
topic: topic.angular-fundamentals
concepts:
  - concept.angular-signals
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

With the introduction of Signals in Angular 16+, understanding when to use Signals versus RxJS Observables is crucial for modern Angular development. Interviewers want to see if you understand the different reactive paradigms—fine-grained reactivity for state (Signals) vs. asynchronous event streams (Observables)—and how they complement each other.

## Key Concepts

- **Synchronous vs. Asynchronous:** Signals are always synchronous and have an initial value. Observables can be asynchronous and may not emit immediately.
- **Fine-grained Reactivity:** Signals allow Angular to track exactly which parts of the UI need updating.
- **Stream Processing:** RxJS excels at complex asynchronous operations like debouncing, switching, and merging.
- **Pull vs. Push:** Signals are "producer-push, consumer-pull" (lazy evaluation), while Observables are "push".
