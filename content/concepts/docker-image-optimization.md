---
id: concept.docker-image-optimization
title: Docker Image Optimization (Caching & .dockerignore)
slug: docker-image-optimization
topic: topic.containerization
description: Advanced techniques for reducing image size and speeding up build times.
---
# Docker Image Optimization

Building efficient Docker images involves two main goals: reducing the final image size and minimizing the build time through efficient layer caching.

## 1. Layer Caching
Docker processes each instruction in a Dockerfile and creates a new layer. These layers are cached.
- **Invalidation:** If an instruction changes (or a file it copies changes), that layer and all subsequent layers are invalidated and must be rebuilt.
- **Optimization:** Order your instructions from "least likely to change" to "most likely to change." For example, install dependencies *before* copying your source code.

## 2. The .dockerignore File
Similar to `.gitignore`, a `.dockerignore` file tells Docker which files or directories to exclude from the build context.
- **Why it matters:** It prevents large or sensitive files (like `node_modules`, `.git`, `.env`, or build binaries) from being sent to the Docker daemon.
- **Benefits:** Faster builds (smaller context) and smaller images (if using `COPY . .`).

## 3. Minimizing Layers
While modern Docker versions are better at handling many layers, combining related commands into a single `RUN` instruction (using `&&` and ``) is still a common practice to reduce metadata overhead and ensure temporary files are deleted in the same layer they were created.
