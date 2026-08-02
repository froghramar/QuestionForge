---
id: concept.angular-functional-interceptors
title: Functional Interceptors
slug: angular-functional-interceptors
topic: topic.angular-fundamentals
description: Modern, functional approach to intercepting HTTP requests in Angular.
---
# Functional Interceptors
Introduced in Angular 15, functional interceptors provide a more lightweight and composable way to handle HTTP requests and responses compared to the older class-based `HttpInterceptor`.

Benefits:
- **Reduced Boilerplate:** No need to create a class and implement an interface.
- **Improved Tree-shaking:** Functions are easier for bundlers to optimize than classes.
- **Better Type Safety:** Leverages standard TypeScript function signatures.
- **Simple Configuration:** Configured directly in `provideHttpClient(withInterceptors([...]))`.
