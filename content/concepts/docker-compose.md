---
id: concept.docker-compose
title: Docker Compose
slug: docker-compose
topic: topic.containerization
description: A tool for defining and running multi-container Docker applications.
---
# Docker Compose

Docker Compose is a tool for defining and running multi-container applications. It uses a YAML file (`docker-compose.yml`) to configure your application's services, networks, and volumes.

## Key Features

- **Single Command Orchestration:** With a single command (`docker compose up`), you can create and start all the services defined in your configuration.
- **Service Isolation:** Each service runs in its own container but can communicate with others over a common network.
- **Environment Consistency:** Ensures that the entire stack (web, DB, cache) is set up identically across different environments (dev, staging, etc.).
- **Project Scoping:** Compose uses a project name (usually the directory name) to isolate environments on the same host.

## Core Components of `docker-compose.yml`

1.  **services:** Defines the individual containers (e.g., `web`, `db`).
2.  **networks:** Defines the virtual networks the containers connect to.
3.  **volumes:** Defines the persistent storage shared or used by services.
4.  **build:** Instructions for building an image from a Dockerfile.
5.  **image:** Specifies a pre-built image to use.
