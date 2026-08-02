---
id: concept.docker-buildkit
title: Docker BuildKit
slug: docker-buildkit
topic: topic.containerization
description: The modern Docker build engine providing concurrent builds and advanced features.
---
# Docker BuildKit

BuildKit is the next-generation build engine for Docker. It was introduced in Docker 18.09 and is now the default engine.

## Key Advantages over the Legacy Builder
- **Concurrent Execution:** BuildKit can analyze the dependency graph of your Dockerfile and run independent stages in parallel.
- **Improved Caching:** Supports more efficient caching, including remote cache backends.
- **Secret Mounting:** Allows you to pass secrets (like API keys or SSH keys) to the build process without them ever being stored in the final image or build metadata.
- **SSH Forwarding:** Can forward your host's SSH agent to the container during build time to access private repositories.
- **Better Output:** Provides a much more readable, interactive progress display.

## New Dockerfile Instructions (`--mount`)
BuildKit introduces the `--mount` flag for `RUN` instructions:
- `RUN --mount=type=cache`: Persistent cache for package managers (e.g., `npm` or `apt` cache).
- `RUN --mount=type=secret`: Access a secret file during the build.
- `RUN --mount=type=ssh`: Use SSH keys from the host.

## Enabling BuildKit
If not already the default, it can be enabled via the environment variable:
`export DOCKER_BUILDKIT=1`
