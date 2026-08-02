---
id: question.angular-selectorless-components
title: Selectorless Components vs. String Selectors
slug: angular-selectorless-components
difficulty: Easy
topic: topic.angular-fundamentals
concepts:
  - concept.angular-selectorless-components
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Selectorless components are a major DX (Developer Experience) improvement in Angular 22. Interviewers ask this to see if you understand the modern component model and the move away from magic strings. They want to gauge your understanding of how this change improves type safety and simplifies the build process.

## Key Concepts

- **Class-based consumption:** Using the class name directly in the template.
- **Refactoring Safety:** Why string selectors were a bottleneck for IDEs.
- **Import/Export semantics:** How selectorless components change the way we think about component visibility.
- **Backward Compatibility:** How they interact with existing selector-based components.

