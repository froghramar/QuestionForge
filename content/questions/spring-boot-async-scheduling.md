---
id: question.spring-boot-async-scheduling
title: Spring Boot Async and Scheduling
slug: spring-boot-async-scheduling
difficulty: Hard
topic: topic.spring-boot-fundamentals
estimated_time: 20
updated: 2026-08-05
---
## Why This Is Asked
Async and scheduling annotations hide execution policy details. Interviewers assess whether you size executors, handle failures, and avoid duplicate work in a cluster.
## Key Concepts
- `@Async` dispatches through a configured task executor.
- `@Scheduled` runs work according to a local scheduler.
- Proxy rules apply to annotation-based execution.
- Multiple instances require distributed coordination for singleton jobs.
## Question Variations
- "Why is the default async executor often insufficient?"
- "What happens to a scheduled job in several replicas?"
- "Why might calling an `@Async` method internally run synchronously?"
