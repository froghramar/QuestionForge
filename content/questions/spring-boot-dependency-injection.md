---
id: question.spring-boot-dependency-injection
title: Spring Boot Dependency Injection
slug: spring-boot-dependency-injection
difficulty: Medium
topic: topic.spring-boot-fundamentals
estimated_time: 15
updated: 2026-08-05
---
## Why This Is Asked
Dependency injection is central to Spring design. This question evaluates constructor injection, bean ownership, and how to resolve multiple implementations safely.
## Key Concepts
- Constructor injection makes required dependencies explicit and testable.
- Components and `@Bean` methods define container-managed objects.
- `@Primary` and `@Qualifier` disambiguate multiple candidates.
- Bean scope should match lifecycle and concurrency needs.
## Question Variations
- "Why is constructor injection preferred over field injection?"
- "How do you inject one of several implementations?"
- "When should a bean be request-scoped?"
