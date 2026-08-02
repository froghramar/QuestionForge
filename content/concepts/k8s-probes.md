---
id: concept.k8s-probes
title: Kubernetes Health Probes
slug: k8s-probes
topic: topic.orchestration
description: Mechanism for the kubelet to check the health and readiness of containers.
---
# Kubernetes Health Probes

Probes allow Kubernetes to monitor the health of your applications and take automatic action when things go wrong.

## 1. Liveness Probe
- **Goal:** Is the container alive?
- **Action:** If it fails, the kubelet kills the container and restarts it (based on the restart policy).
- **Use Case:** Catching deadlocks where the app is running but can't do anything.

## 2. Readiness Probe
- **Goal:** Is the container ready to serve traffic?
- **Action:** If it fails, the container's IP is removed from all Services (endpoints). Traffic is stopped until it passes again.
- **Use Case:** During app startup (loading big files, connecting to DB) or when an app is temporarily overloaded.

## 3. Startup Probe
- **Goal:** Has the application started?
- **Action:** All other probes are disabled until the startup probe succeeds.
- **Use Case:** Legacy apps that take a long time to boot. It prevents the Liveness probe from killing the container before it finishes starting up.

## Probe Mechanisms
- **HTTP GET:** Returns a 2xx or 3xx status code.
- **TCP Socket:** Can a TCP connection be established on a specific port?
- **Exec:** Run a command inside the container. Exit code 0 is success.
- **gRPC:** Uses the gRPC Health Checking Protocol.
