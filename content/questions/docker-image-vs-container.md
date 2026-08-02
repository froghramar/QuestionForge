---
id: question.docker-image-vs-container
title: Docker Image vs. Container
slug: docker-image-vs-container
difficulty: Easy
topic: topic.containerization
concepts:
  - concept.docker-layers
estimated_time: 5
updated: 2026-08-02
---

## Why This Is Asked

This is a fundamental question used to verify that a candidate understands the basic mechanics of Docker. It distinguishes between the "blueprint" (image) and the "process" (container).

## Key Concepts

- **Image:** A read-only template with instructions for creating a Docker container.
- **Container:** A runnable instance of an image.
- **State:** Images are immutable/static; containers are dynamic and have state (though it's usually ephemeral).
- **Lifecycle:** You build an image; you start, stop, and delete a container.
