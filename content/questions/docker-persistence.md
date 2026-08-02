---
id: question.docker-persistence
title: Docker Volumes vs. Bind Mounts
slug: docker-persistence
difficulty: Medium
topic: topic.containerization
concepts:
  - concept.docker-persistence
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Understanding persistence is critical for running databases, stateful applications, or development environments in Docker. Interviewers want to see if you know when to use Docker-managed storage versus host-managed storage.

## Key Concepts

- **Ephemeral Storage:** The default container layer is not for long-term data.
- **Volumes:** Docker-managed, high performance, preferred for production.
- **Bind Mounts:** Host-path dependent, great for live-reloading code during development.
- **Data Sharing:** How multiple containers can share the same volume.

## Question Variations

- "What is the difference between a Docker Volume and a Bind Mount?"
- "When would you prefer a Bind Mount over a Volume during development?"
- "How do you ensure that data persists even after a container is removed?"
- "Explain how data is shared between two different containers using a shared volume."
