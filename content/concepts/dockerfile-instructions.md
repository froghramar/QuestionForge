---
id: concept.dockerfile-instructions
title: Dockerfile Instructions (CMD, ENTRYPOINT, COPY, ADD)
slug: dockerfile-instructions
topic: topic.containerization
description: Understanding the nuances of core Dockerfile commands.
---
# Dockerfile Instructions

Writing efficient Dockerfiles requires understanding the specific behavior of each instruction.

## 1. CMD vs. ENTRYPOINT
Both instructions define what command runs when a container starts, but they behave differently:

- **ENTRYPOINT:** Sets the main executable for the image. It is not easily overridden by command-line arguments. Use this for containers that should act like executables (e.g., a CLI tool).
- **CMD:** Sets default arguments for the `ENTRYPOINT` or a default command. It **is** easily overridden by providing arguments to `docker run`.

**The Pattern:** Usually, you use `ENTRYPOINT` for the binary and `CMD` for the default flags.

## 2. COPY vs. ADD
- **COPY:** The preferred instruction. It simply copies files or directories from the host into the container.
- **ADD:** Does everything `COPY` does, but also has extra features: it can fetch files from remote URLs and automatically extract tarballs. **Best Practice:** Use `COPY` unless you explicitly need `ADD`'s extra features to keep the build process transparent.

## 3. Shell vs. Exec Form
Most instructions can be written in two ways:
- **Shell form:** `CMD executable param1` (runs as `/bin/sh -c`)
- **Exec form:** `CMD ["executable", "param1"]` (preferred; runs the executable directly, allowing it to receive Unix signals like `SIGTERM`).
