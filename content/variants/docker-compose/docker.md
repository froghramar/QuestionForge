---
id: variant.docker-compose.docker
question: question.docker-compose
technology: tech.docker
---
# Expected Answer

**Docker Compose** is a tool used to define and share multi-container applications. Instead of running multiple `docker run` commands with complex arguments for networks, volumes, and environment variables, you define everything in a `docker-compose.yml` file.

With one command, `docker compose up`, you can launch your entire stack—for example, a React frontend, a Node.js API, and a PostgreSQL database—all pre-configured to talk to each other.

# Why It Matters

It dramatically simplifies the onboarding process for new developers. Instead of a 20-step setup guide, they just need to run `docker compose up`. It also ensures that everyone on the team is developing against the exact same versions of the database, cache, and other services.

# Example Code

### A simple `docker-compose.yml`

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: example_password
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

# Common Mistakes

- **Using `depends_on` and expecting the app to wait for the DB to be "ready"**: `depends_on` only ensures the DB container has *started*, not that the DB engine is ready to accept connections. You often need a "wait-for-it" script or health checks.
- **Committing secrets to `docker-compose.yml`**: Putting production passwords in the YAML file. Instead, use an `.env` file or environment variables.
- **Forgetting to rebuild**: Changing the code or Dockerfile but running `docker compose up` without the `--build` flag, leading to the container running old code.

# Follow-up Questions

- **How do services communicate with each other in Compose?** (Answer: Compose creates a default network. You can reach other services using their service name as the hostname, e.g., `http://db:5432`).
- **What is the difference between `docker compose up` and `docker compose start`?** (Answer: `up` creates and starts containers (and builds images if needed); `start` only restarts containers that were previously stopped).
- **How do you run a specific service in the background?** (Answer: Use the `-d` or `--detach` flag).

# References

- [Docker Documentation: Overview of Docker Compose](https://docs.docker.com/compose/)
- [Docker Documentation: Compose file version 3 reference](https://docs.docker.com/compose/compose-file/compose-file-v3/)
