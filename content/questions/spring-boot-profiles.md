---
id: question.spring-boot-profiles
title: Spring Boot Profiles
slug: spring-boot-profiles
difficulty: Medium
topic: topic.spring-boot-fundamentals
estimated_time: 15
updated: 2026-08-05
---
## Why This Is Asked
Profiles test whether candidates can vary environment-specific wiring safely without scattering environment checks through application code.
## Key Concepts
- Profiles activate configuration and beans for a deployment environment.
- Property source precedence determines the final effective value.
- Production secrets belong in secure external configuration.
- Tests should declare their configuration explicitly.
## Question Variations
- "How do Spring profiles change bean creation?"
- "What wins when a property is defined in several sources?"
- "Why should production secrets not live in profile YAML files?"
