---
id: variant.docker-persistence.docker
question: question.docker-persistence
technology: tech.docker
---
# Expected Answer

The main difference lies in **where the data lives on the host** and **who manages it**.

- **Volumes** are managed by Docker. You create them with `docker volume create`. Docker decides where to store them on the host. They are the best way to persist data in production (e.g., for a Postgres or MongoDB database).
- **Bind Mounts** link a specific path on your host (like `/home/user/my-project`) to a path in the container. They are best for development because any change you make to a file on your host is immediately visible inside the container.

In short: Use **Volumes** for database storage and production data; use **Bind Mounts** for source code during development.

# Why It Matters

Using the wrong type of persistence can lead to data loss (using the container layer), performance bottlenecks (using bind mounts on Mac/Windows for heavy I/O), or security risks (giving a container too much access to the host filesystem via bind mounts).

# Example Code

### Using a Volume
```bash
# Create a volume
docker volume create my-db-data

# Use it in a container
docker run -d 
  --name my-postgres 
  -v my-db-data:/var/lib/postgresql/data 
  postgres:latest
```

### Using a Bind Mount
```bash
# Mount current directory to /app in container
docker run -d 
  --name my-app 
  -v $(pwd):/app 
  node:20-alpine
```

# Common Mistakes

- **Hardcoding host paths in production**: Using bind mounts in a CI/CD pipeline or production cluster where the host path might not exist or might have different permissions.
- **Forgetting volume cleanup**: Running `docker rm` doesn't delete the associated volume. You must use `docker rm -v` or `docker volume prune` to avoid leaking storage.
- **Permission Denied**: When using bind mounts, the user inside the container (e.g., `node` user with UID 1000) might not have permission to write to the host folder owned by `root`.

# Follow-up Questions

- **How do you share data between two containers?** (Answer: Both containers can mount the same named Volume).
- **What is the `docker volume prune` command?** (Answer: It removes all local volumes not used by at least one container).
- **Can you mount a single file as a bind mount?** (Answer: Yes, you can mount individual files, like a `nginx.conf` or `.env` file).

# References

- [Docker Documentation: Manage data in Docker](https://docs.docker.com/storage/)
- [Docker Documentation: Volumes](https://docs.docker.com/storage/volumes/)
