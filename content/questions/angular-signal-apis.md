---
id: question.angular-signal-apis
title: "Signal Inputs, Outputs, and Model vs. Decorators"
slug: angular-signal-apis
difficulty: Easy
topic: topic.angular-fundamentals
concepts:
  - concept.angular-signal-apis
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

The shift from `@Input()` and `@Output()` to `input()` and `output()` is a fundamental change in how Angular components are authored. Interviewers want to see if you understand the benefits of the signal-based approach—primarily how inputs being signals simplifies reactive logic (`computed`, `effect`) and improves type safety (especially for required inputs). They also want to check your understanding of `model()` for two-way binding.

## Key Concepts

- **Read-only Signals:** Why `input()` returns a signal you cannot mutate.
- **`input.required()`:** Native support for mandatory inputs without hacks.
- **Two-way binding with `model()`:** Simplifying the `[(value)]` pattern.
- **Native Effect Integration:** How inputs as signals work with `effect()`.
- **Type Inference:** Better TypeScript support compared to decorators.

