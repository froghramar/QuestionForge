---
id: variant.docker-multi-stage-builds.docker
question: question.docker-multi-stage-builds
technology: tech.docker
---
# Expected Answer

**Multi-stage builds** are a method of optimizing Dockerfiles to keep images small and secure. They allow you to use multiple `FROM` instructions in a single Dockerfile.

The typical pattern involves:
1.  **Build Stage:** Start with a "heavy" image containing all build tools (e.g., `golang:alpine`, `node:20`, `maven`). Compile the code or build the assets.
2.  **Runtime Stage:** Start with a "light" image containing only the bare essentials (e.g., `alpine`, `scratch`, `nginx:alpine`).
3.  **Transfer:** Use `COPY --from=<stage_name>` to move only the compiled binary or build artifacts from the build stage into the runtime stage.

Everything from the build stage (source code, package manager caches, compilers) is discarded, resulting in a final image that is often 90% smaller than a single-stage image.

# Why It Matters

- **Security:** Smaller images have a smaller "attack surface." They don't contain shells, package managers, or source code that could be exploited if the container is compromised.
- **Performance:** Faster pull times, faster deployments, and lower storage costs.
- **Maintainability:** You don't need separate `Dockerfile.build` and `Dockerfile` files or complex wrapper scripts to extract binaries.

# Example Code

### Go Application Example

```dockerfile
# Stage 1: Build the binary
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .

# Stage 2: Final runtime image
FROM alpine:latest
WORKDIR /root/
# Only copy the binary from the builder stage
COPY --from=builder /app/main .
CMD ["./main"]
```

# Common Mistakes

- **Not naming stages:** Using indices like `COPY --from=0` instead of `FROM ... AS builder`. This makes the Dockerfile brittle and hard to read.
- **Forgetting to set `WORKDIR` in both stages:** Leads to confusion about where files are being copied to/from.
- **Still including sensitive files:** Forgetting that `.git` folders or `.env` files might have been copied into the build stage; ensure the `COPY --from` only grabs the specific build artifacts.

# Follow-up Questions

- **What is a "distroless" image?** (Answer: Images that contain only your application and its runtime dependencies. They do not contain package managers, shells, or any other programs you would expect to find in a standard Linux distribution).
- **How does caching work in multi-stage builds?** (Answer: Each stage is cached independently. If you change a file in the build stage, all subsequent layers in that stage and any stages that depend on it will be invalidated).
- **When would you *not* use a multi-stage build?** (Answer: For very simple scripts that don't have a compilation or build step, though even then, using a specific runtime image is usually better).

# References

- [Docker Documentation: Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
- [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
