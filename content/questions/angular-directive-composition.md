---
id: question.angular-directive-composition
title: "Directive Composition API vs. Inheritance"
slug: angular-directive-composition
difficulty: Hard
topic: topic.angular-advanced
concepts:
  - concept.angular-directive-composition
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

Logic reuse is a classic software engineering challenge. In the past, Angular developers often turned to component inheritance, which is brittle and complex. The Directive Composition API is the modern, preferred way to share UI logic. Interviewers ask this to see if you understand how to build flexible, composable UI components and if you're aware of the latest architectural best practices introduced in Angular 15+.

## Key Concepts

- **Composition over Inheritance:** Why inheritance is an anti-pattern in modern UI frameworks.
- **Host Directives:** Applying directives to a component's host via metadata.
- **Input/Output Mapping:** Exposing directive properties through the host component.
- **Shared Logic:** Using directives for common behaviors like `Tooltip`, `Ripple`, or `Validation`.

