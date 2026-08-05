---
id: question.spring-boot-rest-validation
title: Spring Boot REST Validation
slug: spring-boot-rest-validation
difficulty: Medium
topic: topic.spring-boot-fundamentals
estimated_time: 15
updated: 2026-08-05
---
## Why This Is Asked
This question assesses API boundary design: typed request DTOs, validation, status codes, and separation from persistence models.
## Key Concepts
- Controllers bind requests to dedicated DTOs.
- Jakarta Bean Validation validates untrusted inputs with `@Valid`.
- Validation, domain conflicts, and authorization are separate concerns.
- Response contracts should not expose JPA entities directly by default.
## Question Variations
- "Where should request validation run in a Spring controller?"
- "Why not accept an entity directly in a REST endpoint?"
- "How do you return validation errors consistently?"
