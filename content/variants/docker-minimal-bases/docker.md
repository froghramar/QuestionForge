---
id: variant.docker-minimal-bases.docker
question: question.docker-minimal-bases
technology: tech.docker
---
# Expected Answer

**Scratch** and **Distroless** are techniques for creating the smallest and most secure Docker images possible.

- **`FROM scratch`** is an empty base image. It is mostly used for statically compiled binaries (like those written in **Go** or **Rust**). The resulting image contains nothing but your binary.
- **Distroless** images (maintained by Google) go one step further than Alpine. They include only your app and its runtime dependencies (like `libssl` or `glibc`). They specifically **do not** include a shell (`/bin/sh`) or a package manager (`apt`, `apk`).

**Summary:** If you have a static binary, use `scratch`. If you need a runtime like Node or Java but want high security, use **Distroless**.

# Why It Matters

Standard images (like `node` or `python`) are convenient but bloated and insecure. They contain hundreds of binaries that an attacker can use once they've compromised your application (e.g., using `curl` to download a rootkit or `sh` to explore your network). By using minimal bases, you remove these tools, making a successful exploit much harder to execute.

# Example Code

### Go app using `scratch`
```dockerfile
# Build stage
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Final stage
FROM scratch
COPY --from=builder /app/main /main
# Important: you may also need to copy CA certs if making HTTPS calls
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
ENTRYPOINT ["/main"]
```

### Node app using `distroless`
```dockerfile
FROM node:20 AS build-env
WORKDIR /app
COPY . .
RUN npm ci --only=production

FROM gcr.io/distroless/nodejs20-debian12
COPY --from=build-env /app /app
WORKDIR /app
CMD ["index.js"]
```

# Common Mistakes

- **Forgetting CA Certificates:** Statically linked binaries often fail to make HTTPS requests in a `scratch` image because there are no root certificates. You must copy them from the build stage.
- **Trying to `docker exec`:** Developers often get frustrated when they can't log into a distroless container to debug. (Solution: Use ephemeral debug containers in Kubernetes or temporary "debug" builds).
- **Not using static linking for `scratch`:** If your binary is dynamically linked to `libc`, it will crash in `scratch` with a "file not found" error.

# Follow-up Questions

- **How do you debug a `scratch` or Distroless container?** (Answer: In Kubernetes, use `kubectl debug`. In local Docker, you might need to rebuild with a shell or use a tool like `dive` to inspect layers).
- **What is the difference between `alpine` and `distroless`?** (Answer: Alpine is a full Linux distro with a shell and package manager (`apk`). Distroless has neither).
- **What is `CGO_ENABLED=0`?** (Answer: A Go environment variable that ensures the resulting binary is statically linked and doesn't depend on system libraries like `libc`).

# References

- [GoogleContainerTools/distroless](https://github.com/GoogleContainerTools/distroless)
- [Docker Documentation: About scratch](https://docs.docker.com/build/building/base-images/#create-a-simple-parent-image-using-scratch)
