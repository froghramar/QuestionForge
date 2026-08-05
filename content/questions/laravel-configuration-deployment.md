---
id: question.laravel-configuration-deployment
title: Laravel Configuration and Deployment
slug: laravel-configuration-deployment
difficulty: Hard
topic: topic.laravel-fundamentals
estimated_time: 20
updated: 2026-08-05
---
## Why This Is Asked
Deployment questions test whether candidates understand environment configuration, caching, worker lifecycle, and secure production hosting.
## Key Concepts
- `.env` is environment-specific and must not be committed.
- Configuration values should be read through config files, not `env()` at runtime.
- Config and route caches must be rebuilt during deployment.
- Queue workers and schedulers need supervised lifecycle management.
## Question Variations
- "Why should `env()` not be used outside Laravel config files?"
- "What changes when configuration is cached?"
- "How do queue workers receive a new deployment?"
