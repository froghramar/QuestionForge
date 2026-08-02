---
id: concept.k8s-resources
title: Resource Management (Requests vs. Limits)
slug: k8s-resources
topic: topic.orchestration
description: How Kubernetes manages CPU and Memory for containers.
---
# Kubernetes Resource Management

Kubernetes allows you to specify how much CPU and Memory (RAM) each container needs. This is critical for the scheduler to decide which node to place a Pod on and for the node to manage its resources.

## 1. Requests
- **Definition:** The minimum amount of resources a container is guaranteed to have.
- **Scheduling:** The scheduler uses the sum of requests to ensure a node has enough capacity before placing a Pod there.
- **Over-commitment:** If a node is over-committed, containers are guaranteed their requested amount but may compete for any remaining "slack" capacity.

## 2. Limits
- **Definition:** The maximum amount of resources a container is allowed to consume.
- **CPU Limits:** If a container exceeds its CPU limit, it is **throttled** (slowed down). It is usually not killed.
- **Memory Limits:** If a container exceeds its memory limit, it is **OOM Killed** (Out of Memory) by the kernel.

## 3. Quality of Service (QoS) Classes
Kubernetes assigns a QoS class to Pods based on their requests and limits:
- **Guaranteed:** Requests and Limits are equal for all containers in the Pod. (Most stable).
- **Burstable:** At least one container has a request, but they are not equal to limits.
- **BestEffort:** No requests or limits are specified. (First to be killed when the node is under pressure).
