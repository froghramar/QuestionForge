---
id: question.spring-boot-http-clients
title: Spring Boot HTTP Clients
slug: spring-boot-http-clients
difficulty: Hard
topic: topic.spring-boot-fundamentals
estimated_time: 20
updated: 2026-08-05
---
## Why This Is Asked
Outbound HTTP calls need timeouts, error mapping, observability, and resource control. This question tests resilient integration design rather than just a client API.
## Key Concepts
- Configure connection and response timeouts explicitly.
- Map remote failures to domain-appropriate errors.
- Propagate tracing and correlation metadata safely.
- Retries need idempotency and bounded backoff.
## Question Variations
- "Why is an HTTP call without a timeout dangerous?"
- "When is retrying a POST safe?"
- "How should a service map a downstream 404?"
