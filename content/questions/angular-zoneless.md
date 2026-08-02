---
id: question.angular-zoneless
title: "Zoneless Angular: Architecture and Migration"
slug: angular-zoneless
difficulty: Hard
topic: topic.angular-advanced
concepts:
  - concept.angular-change-detection
estimated_time: 20
updated: 2026-08-02
---

## Why This Is Asked

Zoneless is the future (and as of v22, the recommended standard) of Angular. Interviewers ask this to ensure you understand how change detection works at a fundamental level when `Zone.js` is removed. They'll test your knowledge of how to bootstrap a zoneless app, how asynchronous events trigger updates, and how to identify and fix code that relies on "magic" zone-based change detection.

## Key Concepts

- **`provideExperimentalZonelessChangeDetection()`**: (Now stable in v22) The provider to disable Zone.js.
- **Signal-based Triggers:** Why Signals are essential for Zoneless performance.
- **Manual Scheduling:** Understanding how `ChangeDetectorRef.markForCheck()` works in a zoneless world.
- **Third-party Library Compatibility:** Handling libraries that expect Zone.js to be present.
- **Performance Benefits:** Bundle size reduction and stack trace clarity.

