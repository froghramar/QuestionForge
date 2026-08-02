---
id: question.docker-healthcheck
title: Docker Health Checks
slug: docker-healthcheck
difficulty: Medium
topic: topic.containerization
concepts:
  - concept.docker-healthchecks
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Interviewers want to see if you build "self-healing" systems. Knowing how to implement health checks is the difference between a system that fails silently and one that automatically recovers from internal application errors.

## Key Concepts

- **Liveness vs. Readiness:** While Docker only has one `HEALTHCHECK`, understanding the difference (is the process alive vs. is it ready to serve traffic) is key.
- **Exit Codes:** How Docker uses the exit code of the health check command (0 for success, 1 for failure).
- **Orchestration Integration:** How health status affects container lifecycle in Compose or Swarm.
- **Overhead:** Ensuring the health check command doesn't consume too many resources.
