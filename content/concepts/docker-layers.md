---
id: concept.docker-layers
title: Docker Layers
slug: docker-layers
topic: topic.containerization
description: How Docker uses a Union File System to stack read-only layers.
---
# Docker Image Layers

A Docker image consists of a series of **read-only layers**, each representing an instruction in the image's Dockerfile. These layers are stacked on top of each other to form the final image.

## How Layers Work

- **Union File System (UnionFS):** Docker uses UnionFS to combine these layers into a single coherent file system.
- **Immutability:** Each layer is immutable. Once created, it never changes.
- **Caching:** Docker caches layers. If a Dockerfile instruction hasn't changed, Docker reuses the existing layer from the cache during the build process, significantly speeding up builds.
- **Copy-on-Write (CoW):** When a container is started from an image, Docker adds a thin **writable layer** (the "container layer") on top of the stack. Any changes made to the running container (like writing new files or modifying existing ones) are written to this thin layer.

## Optimization Strategy

To keep images small and builds fast:
1.  **Order matters:** Place instructions that change frequently (like `COPY . .`) as late as possible in the Dockerfile.
2.  **Chain commands:** Combine multiple `RUN` commands using `&&` to reduce the number of layers.
3.  **Clean up:** Remove temporary files and package manager caches in the same `RUN` instruction where they were created.
