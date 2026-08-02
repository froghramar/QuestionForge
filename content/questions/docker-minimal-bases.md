---
id: question.docker-minimal-bases
title: Scratch vs. Distroless Images
slug: docker-minimal-bases
difficulty: Hard
topic: topic.containerization
concepts:
  - concept.docker-minimal-bases
  - concept.docker-multi-stage-builds
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

This is a deep-dive question into container security and optimization. It tests if the candidate knows how to build "enterprise-grade" images that are not just small, but also hardened against common attacks by removing every unnecessary binary.

## Key Concepts

- **Attack Surface:** How removing shells and package managers improves security.
- **Static vs. Dynamic Linking:** Why `scratch` only works for some languages.
- **Debugging:** The trade-off between security and ease of troubleshooting.
- **CA Certificates:** A common pitfall when using ultra-minimal images.
