---
id: question.spring-boot-data-transactions
title: Spring Boot Data Transactions
slug: spring-boot-data-transactions
difficulty: Hard
topic: topic.spring-boot-fundamentals
estimated_time: 20
updated: 2026-08-05
---
## Why This Is Asked
Transactions expose whether a candidate understands atomic business operations beyond repository method calls.
## Key Concepts
- `@Transactional` defines a transaction boundary around a service operation.
- Runtime exceptions roll back by default; checked exceptions need explicit configuration.
- Transaction proxies apply only to calls that pass through the Spring proxy.
- Keep transactions short and avoid remote calls inside them.
## Question Variations
- "Why is a transaction normally placed on a service method?"
- "Why can self-invocation bypass `@Transactional`?"
- "Which exceptions trigger rollback by default?"
