---
id: variant.docker-networking.docker
question: question.docker-networking
technology: tech.docker
---
# Expected Answer

Docker uses network drivers to manage container communication. The two most common for standalone containers are **Bridge** and **Host**.

- **Bridge Network (Default):** Creates a virtual bridge (usually named `docker0`) on the host. Containers get their own private IP address (e.g., `172.17.0.2`). To expose a service, you must "publish" a port (e.g., `-p 8080:80`), which uses NAT (Network Address Translation).
- **Host Network:** The container shares the host’s networking namespace directly. It doesn't get its own IP; instead, it binds directly to the host's ports. If the container runs a web server on port 80, it will be reachable on port 80 of the host's IP address.

**Summary:** Use **Bridge** for isolation and when you want to map ports. Use **Host** for maximum performance (no NAT overhead) or when a container needs to handle a large range of ports.

# Why It Matters

Choosing the right network mode affects both **security** and **performance**. Bridge networking provides a layer of isolation that is usually desired. However, for high-throughput applications, the overhead of Docker's bridge and user-land proxy can be a bottleneck, making `host` networking a better choice.

# Example Code

### Running with a Bridge Network (Explicit)
```bash
# Create a user-defined bridge network
docker network create my-net

# Run a container on that network
docker run -d --name web --network my-net nginx
```

### Running with Host Networking
```bash
# Container uses the host's network stack directly
docker run -d --name web --network host nginx
```

# Common Mistakes

- **Assuming containers on different bridge networks can talk**: By default, containers can only communicate if they are on the *same* network.
- **Port conflicts in Host mode**: Trying to run two containers in `host` mode that both want to bind to port 80. Only one will succeed.
- **Using the default `bridge` network for production**: The default bridge (called `bridge`) doesn't support automatic DNS resolution by container name. You should always create a **user-defined bridge network**.

# Follow-up Questions

- **How do you link two containers together?** (Answer: Put them on the same user-defined bridge network; they can then use each other's container names as hostnames).
- **What is the `docker0` interface?** (Answer: It's the default virtual bridge created by the Docker daemon to handle communication for containers using the default bridge network).
- **What is Overlay networking?** (Answer: A driver used for multi-host networking, typically in Docker Swarm or Kubernetes).

# References

- [Docker Documentation: Networking overview](https://docs.docker.com/network/)
- [Docker Documentation: Bridge network driver](https://docs.docker.com/network/bridge/)
