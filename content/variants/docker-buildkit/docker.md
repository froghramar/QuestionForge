---
id: variant.docker-buildkit.docker
question: question.docker-buildkit
technology: tech.docker
---
# Expected Answer

**BuildKit** is the modern build engine for Docker. It replaces the old, sequential builder with a much more powerful and efficient system.

The biggest advantages of BuildKit are:
1.  **Parallelism:** If you have multiple stages in a multi-stage build that don't depend on each other, BuildKit will run them at the same time.
2.  **Mounts:** It allows you to use `--mount=type=cache` to persist package manager caches (like `/root/.npm`) between builds, making subsequent `npm install` runs nearly instantaneous.
3.  **Secrets:** You can use `--mount=type=secret` to pass sensitive info (like a `.npmrc` or AWS keys) into a `RUN` command. The secret is only available in memory during that command and is **never** saved to an image layer.

# Why It Matters

BuildKit solves two of the biggest Dockerfile pain points: **build speed** and **security**. Before BuildKit, if you wanted to install a private npm package, you had to either bake your SSH key into an image (insecure) or use complex workarounds. With BuildKit, it’s a single flag.

# Example Code

### Using Cache Mounts (Node.js)
```dockerfile
# syntax=docker/dockerfile:1
FROM node:20
WORKDIR /app
COPY package*.json ./
# This cache persists across builds on the same host
RUN --mount=type=cache,target=/root/.npm 
    npm install
COPY . .
```

### Using Build Secrets
```dockerfile
# Run the build with: docker build --secret id=mysecret,src=token.txt .
RUN --mount=type=secret,id=mysecret 
    export TOKEN=$(cat /run/secrets/mysecret) && 
    ./deploy.sh
```

# Common Mistakes

- **Not enabling BuildKit:** Trying to use `--mount` with the legacy builder (it will fail with a syntax error).
- **Hardcoding secrets in ENV:** Still using `ENV API_KEY=...` which is visible to anyone who can `docker inspect` the image.
- **Sequential thinking:** Not realizing that BuildKit can optimize your build graph; you can structure your Dockerfile to maximize parallel execution.

# Follow-up Questions

- **What is the `syntax` header in a Dockerfile?** (Answer: It’s a comment at the top of the file, e.g., `# syntax=docker/dockerfile:1`, that tells BuildKit which version of the frontend to use, allowing you to use new features without updating the Docker daemon).
- **How does BuildKit handle unused stages?** (Answer: If a stage in a multi-stage build isn't needed for the final target, BuildKit will skip it entirely).
- **Can BuildKit push to multiple registries at once?** (Answer: Yes, using the `buildx` CLI plugin, which is built on top of BuildKit).

# References

- [Docker Documentation: Build with BuildKit](https://docs.docker.com/build/buildkit/)
- [Docker Documentation: Build secrets](https://docs.docker.com/build/building/secrets/)
