---
id: variant.docker-image-optimization.docker
question: question.docker-image-optimization
technology: tech.docker
---
# Expected Answer

Optimizing Docker images requires a two-pronged approach: **Layer Ordering** and **Context Management**.

1.  **Optimize the Cache:** Place instructions that change infrequently (like installing OS packages or app dependencies) at the top of the Dockerfile. For a Node.js app, copy `package.json` and run `npm install` *before* copying the rest of the source code. This way, if you only change a line of code, Docker reuses the cached `node_modules` layer.
2.  **Use `.dockerignore`:** Exclude large folders like `node_modules`, `.git`, and build artifacts from the build context. This reduces the time it takes to send the context to the Docker daemon and prevents accidental inclusion of secrets.
3.  **Minimize Layers:** Chain related shell commands using `&&`. For example, `RUN apt-get update && apt-get install -y packages && rm -rf /var/lib/apt/lists/*`. Deleting the cache in the same `RUN` instruction ensures it doesn't persist in the image layer.

# Why It Matters

Huge images slow down CI/CD pipelines, increase storage costs, and take longer to pull and start in production. Inefficient caching makes developers wait minutes for builds that should take seconds, significantly hurting productivity.

# Example Code

### ❌ Inefficient Dockerfile
```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```
*Problem: Any file change causes `npm install` to run again.*

### ✅ Optimized Dockerfile
```dockerfile
FROM node:20-slim
WORKDIR /app
# 1. Install dependencies first
COPY package*.json ./
RUN npm install --production
# 2. Copy source code last
COPY . .
CMD ["node", "index.js"]
```

# Common Mistakes

- **Forgetting `.dockerignore`:** Sending the entire `node_modules` or `.git` folder to the daemon, making the build start very slowly.
- **Copying unnecessary files:** Using `COPY . .` without a `.dockerignore`, which might include sensitive `.env` files.
- **Not cleaning up after `apt` or `yum`:** Leaving package manager metadata and caches in the image, adding hundreds of MBs of useless data.

# Follow-up Questions

- **What is the "Build Context"?** (Answer: The set of files sent to the Docker daemon when you run `docker build`. The daemon uses these files to process `COPY` and `ADD` instructions).
- **Does the order of `ENV` instructions matter?** (Answer: Yes. Like any other instruction, changing an `ENV` variable will invalidate the cache for all subsequent layers).
- **How does `docker squash` work?** (Answer: It’s a way to collapse all layers of an image into a single one, though multi-stage builds are now the preferred way to achieve similar results).

# References

- [Docker Documentation: Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Documentation: .dockerignore file](https://docs.docker.com/engine/reference/builder/#dockerignore-file)
