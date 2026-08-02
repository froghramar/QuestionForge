---
id: variant.docker-non-root-user.docker
question: question.docker-non-root-user
technology: tech.docker
---
# Expected Answer

By default, Docker containers run as the **root** user. This is a security risk because if an attacker compromises the application, they have full administrative privileges within the container, which significantly aids in "container escape" attacks against the host kernel.

To mitigate this, you should:
1.  Create a system user and group in the Dockerfile.
2.  Ensure that the application files are owned by or accessible to this user.
3.  Use the `USER` instruction to switch to that user before the `CMD` or `ENTRYPOINT`.

# Why It Matters

Running as a non-root user is a core requirement for production environments, especially in orchestrators like Kubernetes, which often have Security Context constraints that forbid running as root. It follows the **Principle of Least Privilege**, ensuring that a compromised process has the minimum necessary access to do harm.

# Example Code

### Secure Dockerfile Pattern

```dockerfile
FROM node:20-alpine

# Create a group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Change ownership of the app directory
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

CMD ["node", "index.js"]
```

# Common Mistakes

- **Switching to `USER` too early:** If you switch to a non-root user before running `npm install` or `apt-get`, the installation might fail due to lack of permissions.
- **Forgetting `chown`:** Switching to a non-root user but leaving files owned by `root`. The app might fail to start if it needs to write to a log file or a cache folder.
- **Assuming `root` inside == `root` outside:** While they share the same kernel, they are isolated by namespaces. However, a container root user with certain capabilities (like `CAP_SYS_ADMIN`) is dangerously close to host root.

# Follow-up Questions

- **What are Docker Capabilities?** (Answer: They allow you to break down the "root" power into smaller pieces, so you can give a container just the specific kernel permissions it needs, like `CAP_NET_BIND_SERVICE` to bind to port 80, without giving it full root).
- **How does the `--user` flag in `docker run` relate to the `USER` instruction?** (Answer: The command-line flag `--user` (or `-u`) overrides the `USER` instruction defined in the Dockerfile).
- **What is Rootless Docker?** (Answer: A way to run the Docker daemon itself as a non-root user, adding another layer of security).

# References

- [Docker Documentation: Best practices for Dockerfile - USER](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user)
- [OWASP: Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
