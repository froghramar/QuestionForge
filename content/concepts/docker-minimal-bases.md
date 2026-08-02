---
id: concept.docker-minimal-bases
title: Minimal Base Images (Scratch & Distroless)
slug: docker-minimal-bases
topic: topic.containerization
description: Using the smallest possible base images for maximum security and efficiency.
---
# Minimal Base Images

For many production applications, especially those compiled into static binaries (like Go, Rust, or C++), you don't need a full Linux distribution (like Ubuntu or even Alpine) inside your container.

## 1. The `scratch` Image
- **What it is:** A completely empty, zero-byte image. It is the most minimal base possible in Docker.
- **Use Case:** Perfect for statically linked binaries. Your container will contain *only* your executable.
- **Pros:** Smallest possible size, zero attack surface (no shell, no `ls`, no `libc`).
- **Cons:** Extremely hard to debug (you can't `exec` into it). You must handle all dependencies (like CA certificates) yourself.

## 2. Distroless Images (by Google)
- **What it is:** "Distroless" images contain only your application and its runtime dependencies. They do **not** contain package managers, shells, or any other programs you would expect to find in a standard Linux distribution.
- **Use Case:** Ideal for runtimes like Node.js, Python, or Java where you need *some* shared libraries but don't want the security risk of a full shell.
- **Pros:** Much more secure than standard bases, easier than `scratch` because they include common requirements like `glibc` and CA certs.
- **Cons:** Still difficult to debug; requires a multi-stage build.

## Comparison

| Feature | Standard (Ubuntu/Alpine) | Distroless | Scratch |
| :--- | :--- | :--- | :--- |
| **Size** | Large (Ubuntu) / Small (Alpine) | Very Small | Zero |
| **Shell** | Yes | No | No |
| **Package Manager** | Yes | No | No |
| **Security** | Lower | High | Maximum |
