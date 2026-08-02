---
id: concept.docker-security
title: Docker Security Best Practices
slug: docker-security
topic: topic.containerization
description: Fundamental security principles for building and running containers.
---
# Docker Security

Security in Docker is about minimizing the attack surface and preventing "container escapes" where an attacker gains access to the host.

## 1. Principle of Least Privilege (Non-Root User)
By default, Docker containers run as `root`. If a container is compromised, the attacker has root access inside the container, making it much easier to exploit kernel vulnerabilities and escape to the host.
**Best Practice:** Create a dedicated user and group in your Dockerfile and switch to it using the `USER` instruction.

## 2. Image Scanning
Use tools like `docker scout`, Trivy, or Snyk to scan your images for known vulnerabilities (CVEs) in your base images and dependencies.

## 3. Minimize Image Size (Distroless)
Smaller images have fewer binaries (like `curl`, `apt`, or `sh`) that an attacker can use. Using "Distroless" images or minimal bases like Alpine Linux is a key security measure.

## 4. Read-Only Filesystems
If your application doesn't need to write to the filesystem, run the container with `--read-only`. This prevents attackers from downloading and executing malicious scripts.

## 5. Secret Management
Never bake secrets (API keys, passwords) into the Docker image layers. Use environment variables (carefully), Docker Secrets, or vault providers.
