---
id: question.docker-non-root-user
title: Running Containers as Non-Root
slug: docker-non-root-user
difficulty: Medium
topic: topic.containerization
concepts:
  - concept.docker-security
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Running as root is one of the most common and dangerous Docker misconfigurations. Interviewers ask this to ensure you understand the "Principle of Least Privilege" and how to implement it in a containerized environment.

## Key Concepts

- **Container Escape:** How root access inside a container increases the risk of host compromise.
- **The `USER` Instruction:** How to switch users in a Dockerfile.
- **Permission Management:** How to ensure the non-root user can still access necessary files.
- **Privileged Containers:** Why they should be avoided.

## Question Variations

- "Why is it considered a security best practice to run Docker containers as a non-root user?"
- "How do you create a non-root user and switch to it in a Dockerfile?"
- "What are the common issues you might face when switching from root to a non-root user (e.g., file permissions)?"
- "What is a 'privileged' container, and why is it dangerous?"
