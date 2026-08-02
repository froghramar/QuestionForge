---
id: question.dependency-injection
title: Dependency Injection
slug: dotnet-dependency-injection
difficulty: Medium
topic: topic.design-patterns
concepts:
  - concept.dependency-injection
estimated_time: 15
updated: 2026-08-01
---

## Why This Is Asked

DI is a foundational pattern in modern software. Interviewers want to confirm you understand Inversion of Control, can explain the benefits of loose coupling and testability, and know how DI containers manage object lifetimes.

## Key Concepts

- Dependency Injection is a form of Inversion of Control (IoC) where dependencies are provided externally
- Three injection styles: constructor injection (most common), method injection, property injection
- Service lifetimes: Transient (new instance per request), Scoped (per scope/HTTP request), Singleton (shared)
- Enables unit testing by allowing mock/stub substitution
- The composition root is where the entire object graph is wired up

## Question Variations

- "What is Dependency Injection, and how does it relate to Inversion of Control (IoC)?"
- "Explain the difference between Transient, Scoped, and Singleton lifetimes in a DI container."
- "Why is constructor injection generally preferred over property or method injection?"
- "How does Dependency Injection improve the testability of your code?"
