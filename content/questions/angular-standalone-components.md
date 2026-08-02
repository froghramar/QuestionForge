---
id: question.angular-standalone-components
title: Standalone Components vs. NgModules
slug: angular-standalone-components
difficulty: Easy
topic: topic.angular-fundamentals
concepts:
  - concept.angular-standalone
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Standalone components represent the most significant shift in Angular's architecture in recent years. Interviewers ask this to ensure you are up-to-date with modern Angular (v14+) and understand how to build applications without the overhead of `NgModules`. They want to see if you understand the benefits of simplified mental models and better tree-shaking.

## Key Concepts

- **SCAM Pattern:** The "Single Component Angular Module" pattern that preceded standalone components.
- **`standalone: true`:** The flag that marks a component, directive, or pipe as standalone.
- **Explicit Imports:** Standalone components must explicitly import their own dependencies (other components, directives, or modules).
- **Bootstrap Simplification:** How `bootstrapApplication` replaces `platformBrowserDynamic().bootstrapModule()`.
