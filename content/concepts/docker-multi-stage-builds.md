---
id: concept.docker-multi-stage-builds
title: Multi-stage Builds
slug: docker-multi-stage-builds
topic: topic.containerization
description: Using multiple FROM statements in a single Dockerfile to optimize image size.
---
# Multi-stage Builds

Multi-stage builds allow you to use multiple `FROM` statements in your Dockerfile. Each `FROM` instruction begins a new stage of the build. You can selectively copy artifacts from one stage to another, leaving behind everything you don't want in the final image.

## Key Benefits

- **Smaller Images:** By excluding build-time dependencies (compilers, SDKs, build tools) from the final runtime image, you significantly reduce the attack surface and download size.
- **Simplified CI/CD:** You don't need to maintain separate Dockerfiles for building and running. Everything is contained in one file.
- **Layer Optimization:** Only the final stage's layers are included in the final image.

## How It Works

You name your stages using `AS name` and then use `COPY --from=name` to pull specific files into the next stage.

```dockerfile
# Build Stage
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```
