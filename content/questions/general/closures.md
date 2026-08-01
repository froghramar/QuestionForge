---
id: question.closures
title: Closures
slug: explain-closures
difficulty: Medium
topic: topic.type-systems
concepts:
  - concept.closures
companies:
  - company.google
  - company.meta
  - company.stripe
estimated_time: 12
updated: 2026-08-01
---

## Why This Is Asked

Closures are fundamental to functional programming patterns in JavaScript. Interviewers want to see if you understand lexical scoping, can identify closure-related bugs (especially in loops), and know practical applications like data privacy and partial application.

## Key Concepts

- A closure is a function that retains access to its enclosing scope's variables even after that scope has exited
- Created every time a function is defined, not when it's executed
- Classic pitfall: closures over `var` in loops capture the same variable reference
- Practical uses: module pattern, memoization, currying, event handler factories
- Memory implications: closed-over variables are not garbage collected while the closure exists
