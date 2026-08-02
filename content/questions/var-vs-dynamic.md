---
id: question.var-vs-dynamic
title: var vs dynamic
slug: var-vs-dynamic
difficulty: Medium
topic: topic.type-systems
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

This tests understanding of static vs dynamic typing within a statically-typed language. It's important to know when to use type inference (`var`) and when to opt into late-binding (`dynamic`), especially for Interop or JSON scenarios.

## Key Concepts

- `var` is statically typed; the type is determined by the compiler at compile-time.
- `dynamic` is dynamically typed; the type is resolved at runtime.
- `var` has full IntelliSense support; `dynamic` does not.
- `dynamic` bypasses compile-time type checking, which can lead to runtime exceptions if members don't exist.
