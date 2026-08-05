---
id: question.koa-rate-limiting
title: Koa Rate Limiting
slug: koa-rate-limiting
difficulty: Hard
topic: topic.koa-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Rate limiting is a distributed systems concern exposed at the HTTP boundary. Interviewers assess whether you design a fair policy that still works across Koa replicas and reverse proxies.

## Key Concepts

- A limiter needs a key, policy, response, and storage model.
- Identity-based keys are often more meaningful than IPs after authentication.
- Multiple replicas require shared atomic state or gateway enforcement.
- Login and recovery routes should be protected especially carefully.

## Question Variations

- "Why does an in-memory Koa limiter fail when scaled?"
- "When should a limiter key use a user instead of an IP?"
- "What should an API return after a rate limit is exceeded?"
