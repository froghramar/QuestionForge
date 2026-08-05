---
id: question.koa-health-checks
title: Koa Health Checks
slug: koa-health-checks
difficulty: Medium
topic: topic.koa-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Health endpoints determine whether orchestrators restart a process or send it traffic. This question tests whether you understand readiness, liveness, and graceful shutdown from an HTTP service’s perspective.

## Key Concepts

- Liveness detects an unhealthy process and should be lightweight.
- Readiness determines whether the instance can accept new traffic.
- Readiness should fail during initialization and draining.
- Dependency probes should be bounded and selected intentionally.

## Question Variations

- "What is the difference between liveness and readiness in Koa?"
- "Why fail readiness before calling `server.close()`?"
- "Should a health check make an unbounded database query?"
