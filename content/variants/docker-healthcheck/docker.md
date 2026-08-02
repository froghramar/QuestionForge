---
id: variant.docker-healthcheck.docker
question: question.docker-healthcheck
technology: tech.docker
---
# Expected Answer

A **Health Check** is a command that runs inside a container to verify that the application is functioning correctly. Unlike the container's status (which only checks if the PID is alive), a health check can detect if an app is deadlocked, can't connect to the database, or is stuck in an infinite loop.

You define it in a Dockerfile using the `HEALTHCHECK` instruction. It executes a command; if the command returns exit code **0**, the container is `healthy`. If it returns **1**, it is `unhealthy`.

# Why It Matters

In a production environment, you don't want to send traffic to a container that is technically "running" but not actually working. Orchestrators use this status to:
1.  **Restart** unhealthy containers.
2.  **Delay** service startup until the container is ready.
3.  **Stop** routing load balancer traffic to an unhealthy instance.

# Example Code

### Dockerfile Health Check

```dockerfile
FROM nginx:alpine

# Check if the Nginx welcome page is accessible every 30s
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 
  CMD curl -f http://localhost/ || exit 1
```

### Docker Compose Health Check

```yaml
services:
  web:
    image: my-app:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 1m30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

# Common Mistakes

- **Not having `curl` or `wget` in the image:** If you use a minimal image like Alpine or Distroless, the `curl` command might not exist, causing the health check to always fail.
- **Too frequent checks:** Running an expensive health check every second can put unnecessary load on your application.
- **Ignoring `start-period`:** If your app takes 30 seconds to boot but you start checking after 5 seconds, the container will be marked `unhealthy` before it even has a chance to start.

# Follow-up Questions

- **What happens to an unhealthy container in Docker Compose?** (Answer: By default, Compose doesn't restart it unless you use a restart policy, but other services using `depends_on` with a `service_healthy` condition will wait for it).
- **Can you disable a health check defined in a base image?** (Answer: Yes, by using `HEALTHCHECK NONE`).
- **Where can you see the output of a failed health check?** (Answer: By running `docker inspect <container_id>`; look for the `Health` section).

# References

- [Docker Documentation: HEALTHCHECK instruction](https://docs.docker.com/engine/reference/builder/#healthcheck)
- [Docker Documentation: Compose healthcheck](https://docs.docker.com/compose/compose-file/compose-file-v3/#healthcheck)
