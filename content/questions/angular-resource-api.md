---
id: question.angular-resource-api
title: "Data Fetching with Resource API (resource & rxResource)"
slug: angular-resource-api
difficulty: Medium
topic: topic.angular-advanced
concepts:
  - concept.angular-resource-api
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

The Resource API (introduced in v19 and stabilized by v22) is a massive ergonomic improvement for Angular developers. Interviewers want to know if you can move away from verbose RxJS patterns for simple data fetching. They'll look for an understanding of how resources automatically track dependency signals, how to handle loading/error states without manual flags, and the difference between Promise-based and Observable-based resources.

## Key Concepts

- **Signal Reactivity:** How `resource()` reacts to changes in its input signals.
- **State Management:** Using `.value()`, `.status()`, and `.isLoading()`.
- **`rxResource`:** Using `HttpClient` within the resource pattern.
- **Cancellation:** How the API handles rapid input changes (similar to `switchMap`).
- **Error Handling:** Declarative error management within the resource.
