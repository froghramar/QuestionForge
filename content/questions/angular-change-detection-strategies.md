---
id: question.angular-change-detection-strategies
title: "Change Detection: Default vs. OnPush"
slug: angular-change-detection-strategies
difficulty: Medium
topic: topic.angular-fundamentals
concepts:
  - concept.angular-change-detection
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

Performance optimization is a key skill for senior Angular developers. Understanding how to reduce the number of change detection cycles using `OnPush` is essential for building scalable, high-performance applications. Interviewers want to see if you understand the triggers for change detection and how to manually manage it when necessary.

## Key Concepts

- **Directed Acyclic Graph (DAG):** Angular's component tree is checked from top to bottom.
- **Immutability:** `OnPush` relies on object reference changes.
- **`ChangeDetectorRef`:** Manually triggering detection via `markForCheck()` or `detectChanges()`.
- **Async Pipe:** How it interacts with `OnPush` to automatically trigger updates.
