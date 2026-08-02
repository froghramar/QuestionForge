---
id: question.angular-testing-signals
title: "Testing Signal-based Components"
slug: angular-testing-signals
difficulty: Medium
topic: topic.angular-advanced
concepts:
  - concept.angular-signal-apis
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

Testing is a cornerstone of professional software development. With the shift to Signals, traditional testing patterns (like manually triggering `detectChanges()`) are evolving. Interviewers want to see if you understand how to test components that use `input()`, `computed()`, and `effect()`. They specifically look for knowledge on how to update signal inputs in tests and how to handle the synchronous nature of signals during assertions.

## Key Concepts

- **ComponentFixture.setInput():** The modern way to update signal-based inputs in tests.
- **Synchronous Assertions:** Why signals don't always require `whenStable()`.
- **Testing Effects:** Using `TestBed.flushEffects()` to trigger side effects in tests.
- **Testing Computed Signals:** Ensuring derived state updates correctly.
- **Zoneless Testing:** How testing changes when `Zone.js` is removed.

