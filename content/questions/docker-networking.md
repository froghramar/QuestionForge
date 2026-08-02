---
id: question.docker-networking
title: Docker Networking (Bridge vs. Host)
slug: docker-networking
difficulty: Hard
topic: topic.containerization
concepts:
  - concept.docker-networking
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

This is a more advanced question that tests a candidate's understanding of how Docker handles the network stack. It's crucial for troubleshooting connectivity issues and optimizing performance.

## Key Concepts

- **Isolation:** How containers are isolated from the host network by default.
- **Performance:** The overhead of the bridge network vs. the native performance of host networking.
- **Port Conflicts:** How `host` networking avoids NAT but introduces the risk of port collisions on the host.
- **User-defined Bridge Networks:** Why they are better than the default bridge.

## Question Variations

- "Explain the difference between `bridge` and `host` networking in Docker."
- "When would you choose to use `host` networking over the default `bridge`?"
- "What are the security implications of using `host` networking?"
- "How does Docker handle port mapping between the host and the container in bridge mode?"
