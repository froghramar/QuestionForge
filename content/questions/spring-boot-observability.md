---
id: question.spring-boot-observability
title: Spring Boot Observability
slug: spring-boot-observability
difficulty: Hard
topic: topic.spring-boot-fundamentals
estimated_time: 20
updated: 2026-08-05
---
## Why This Is Asked
Production debugging depends on metrics, traces, logs, and consistent correlation. This question tests whether candidates create actionable signals rather than only application logs.
## Key Concepts
- Micrometer provides metrics instrumentation and registry integration.
- Traces connect work across service boundaries.
- Logs need structured, safe context such as request or trace IDs.
- High-cardinality metric tags can overload monitoring systems.
## Question Variations
- "Why are user IDs poor metric tags?"
- "What is the difference between a metric and a trace?"
- "How do you correlate an HTTP error with service logs?"
