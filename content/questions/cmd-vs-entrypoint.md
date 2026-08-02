---
id: question.cmd-vs-entrypoint
title: CMD vs. ENTRYPOINT
slug: cmd-vs-entrypoint
difficulty: Medium
topic: topic.containerization
concepts:
  - concept.dockerfile-instructions
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

This is a classic Docker question that tests whether a candidate understands how to build flexible and signal-aware images. It's crucial for creating containers that behave predictably when receiving stop signals or when being used as CLI tools.

## Key Concepts

- **Overridability:** Which instruction is replaced by command-line arguments.
- **Combining them:** How `CMD` provides default arguments to `ENTRYPOINT`.
- **Exec Form vs. Shell Form:** Why `["executable"]` is better for signal handling.
- **Use Cases:** When to use one over the other.

## Question Variations

- "What is the difference between `CMD` and `ENTRYPOINT` in a Dockerfile?"
- "What happens if you provide arguments to `docker run` when the image has both `ENTRYPOINT` and `CMD`?"
- "Why is the 'exec form' (JSON array) preferred over the 'shell form' for these instructions?"
- "How do you make a Docker image that behaves like an executable using `ENTRYPOINT`?"
