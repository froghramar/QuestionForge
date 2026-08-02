---
id: concept.docker-healthchecks
title: Docker Health Checks
slug: docker-healthchecks
topic: topic.containerization
description: Monitoring the internal state of a containerized application.
---
# Docker Health Checks

A container's status (e.g., `Up 5 minutes`) only tells you if the process is running, not if the application is actually healthy and responding to requests.

## The HEALTHCHECK Instruction
The `HEALTHCHECK` instruction tells Docker how to test a container to check that it is still working.

### Parameters
- `--interval=DURATION` (default: `30s`): How often to run the check.
- `--timeout=DURATION` (default: `30s`): How long to wait for the check to complete.
- `--start-period=DURATION` (default: `0s`): How long to wait for the app to start up before beginning checks.
- `--retries=N` (default: `3`): How many consecutive failures are needed to mark the container as `unhealthy`.

### Health Statuses
1.  **starting:** The container is starting and the `start-period` hasn't elapsed, or the first check hasn't run.
2.  **healthy:** The last health check was successful.
3.  **unhealthy:** The health check failed `N` times in a row.

## Why Use It?
Orchestrators like Docker Compose and Kubernetes use health status to decide when to restart a container or when to start routing traffic to it. Without a health check, a "zombie" container (process running but app deadlocked or crashed internally) will stay in the rotation.
