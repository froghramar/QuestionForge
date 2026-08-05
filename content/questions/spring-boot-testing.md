---
id: question.spring-boot-testing
title: Spring Boot Testing
slug: spring-boot-testing
difficulty: Medium
topic: topic.spring-boot-fundamentals
estimated_time: 15
updated: 2026-08-05
---
## Why This Is Asked
Testing annotations assess whether candidates choose the smallest realistic Spring context for the behavior under test.
## Key Concepts
- Unit tests should not start Spring unnecessarily.
- Slice tests target a layer such as MVC or JPA.
- `@SpringBootTest` loads the full application context when integration is needed.
- Tests need isolated deterministic dependencies and configuration.
## Question Variations
- "When should you use `@WebMvcTest`?"
- "What does `@SpringBootTest` load?"
- "Why avoid full-context tests for every class?"
