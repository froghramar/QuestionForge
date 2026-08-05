---
id: question.express-health-checks
title: Express Health Checks
slug: express-health-checks
difficulty: Medium
topic: topic.express-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Orchestrators and load balancers need a truthful view of an API’s lifecycle. Interviewers use health checks to evaluate whether you distinguish a process being alive from a process being able to accept traffic.

## Key Concepts

- Liveness detects a wedged process and should be cheap.
- Readiness determines whether an instance should receive traffic.
- Readiness should fail while an application is starting or draining.
- Deep dependency checks should be bounded and chosen deliberately.

## Question Variations

- "What is the difference between liveness and readiness?"
- "Should a health endpoint query every downstream service?"
- "What should happen to readiness during graceful shutdown?"
