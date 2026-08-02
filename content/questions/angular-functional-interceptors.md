---
id: question.angular-functional-interceptors
title: Functional Interceptors vs. Class-based Interceptors
slug: angular-functional-interceptors
difficulty: Medium
topic: topic.angular-fundamentals
concepts:
  - concept.angular-functional-interceptors
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

Interceptors are a fundamental part of handling cross-cutting concerns like authentication, logging, and error handling. With the move toward functional programming in Angular, understanding how to write and configure functional interceptors is a key modern skill. Interviewers want to see if you can work with the newer `provideHttpClient` API and understand the benefits of composable functions over classes.

## Key Concepts

- **`HttpInterceptorFn`:** The type definition for functional interceptors.
- **`next()` function:** Passing the request to the next interceptor in the chain.
- **Composability:** How multiple functions are chained together.
- **`provideHttpClient(withInterceptors([...]))`:** The modern configuration method.
- **Injecting services:** Using the `inject()` function inside functional interceptors.

