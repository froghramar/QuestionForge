---
id: question.docker-image-optimization
title: Optimizing Docker Images
slug: docker-image-optimization
difficulty: Medium
topic: topic.containerization
concepts:
  - concept.docker-image-optimization
  - concept.docker-layers
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

This question separates beginners from experienced engineers. Anyone can write a Dockerfile, but only an experienced engineer knows how to keep images small, secure, and buildable in seconds rather than minutes.

## Key Concepts

- **Build Context:** What it is and why it should be small.
- **Layer Order:** Why `COPY package.json` should come before `COPY .`.
- **.dockerignore:** Its role in security and performance.
- **Combining RUN commands:** Reducing the number of layers.

## Question Variations

- "What are some strategies for reducing the size of a Docker image?"
- "Explain the importance of 'layer caching' and how to structure a Dockerfile to maximize it."
- "What is the purpose of a `.dockerignore` file, and how does it affect build performance?"
- "Why should you combine multiple `RUN` commands into a single instruction?"
