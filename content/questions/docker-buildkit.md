---
id: question.docker-buildkit
title: What is Docker BuildKit?
slug: docker-buildkit
difficulty: Hard
topic: topic.containerization
concepts:
  - concept.docker-buildkit
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

BuildKit is the modern standard for Docker builds. This question tests if a candidate is up-to-date with the latest Docker ecosystem and knows how to solve advanced build problems like securely handling secrets or speeding up builds through parallelism and persistent caches.

## Key Concepts

- **Parallelism:** How BuildKit differs from the sequential legacy builder.
- **Build Secrets:** The secure way to handle credentials during a build.
- **Cache Mounts:** Speeding up `npm install` or `pip install` by persisting the cache directory between builds.
- **SSH Forwarding:** Accessing private Git repos during build.
