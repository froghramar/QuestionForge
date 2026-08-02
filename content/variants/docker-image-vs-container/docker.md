---
id: variant.docker-image-vs-container.docker
question: question.docker-image-vs-container
technology: tech.docker
---
# Expected Answer

A **Docker Image** is a read-only, executable package that includes everything needed to run an application: code, runtime, libraries, environment variables, and config files. It is a static "snapshot" of a file system.

A **Docker Container** is a runtime instance of an image. It is what the image becomes when it is executed using `docker run`. It includes the image, an execution environment, and a thin writable layer.

Analogy: If an **Image** is a class in OOP, a **Container** is an instance of that class. Or, if an **Image** is a recipe, a **Container** is the cake being baked.

# Why It Matters

Understanding this distinction is crucial for managing application lifecycles. It explains why changes made inside a running container don't persist in the image, and why you must rebuild the image to deploy code changes. It also forms the basis of Docker's efficiency through layer sharing.

# Example Code

### Working with Images
```bash
# Build an image from a Dockerfile
docker build -t my-app:latest .

# List local images
docker images

# Remove an image
docker rmi my-app:latest
```

### Working with Containers
```bash
# Start a container from an image
docker run -d --name my-running-app my-app:latest

# List running containers
docker ps

# Stop and remove a container
docker stop my-running-app
docker rm my-running-app
```

# Common Mistakes

- **Confusing `docker stop` with `docker rm`**: Thinking that stopping a container deletes its writable layer. It doesn't; you must `rm` the container to clean it up.
- **Trying to "update" an image by changing a container**: Modifying files inside a running container and expecting new containers started from the same image to have those changes.
- **Storing persistent data in the container layer**: Forgetting that the container's writable layer is ephemeral and will be lost when the container is deleted. (Solution: Use Volumes).

# Follow-up Questions

- **What happens to the writable layer when a container is deleted?** (Answer: It is permanently destroyed. Persistent data should be stored in Volumes or Bind Mounts).
- **Can multiple containers share the same image?** (Answer: Yes. Each container gets its own independent writable layer, but they all share the same underlying read-only image layers).
- **How do you persist data across container restarts and deletions?** (Answer: Using Docker Volumes or Bind Mounts).

# References

- [Docker Documentation: About storage drivers](https://docs.docker.com/storage/storagedriver/)
- [Docker Documentation: Docker overview](https://docs.docker.com/get-started/overview/)
