---
id: question.k8s-pod-vs-container
title: Pod vs. Container
slug: k8s-pod-vs-container
difficulty: Easy
topic: topic.orchestration
concepts:
  - concept.k8s-architecture
estimated_time: 5
updated: 2026-08-02
---

## Why This Is Asked

This is the most basic Kubernetes question. It tests whether a candidate understands the fundamental unit of deployment in Kubernetes and how it differs from a raw container.

## Key Concepts

- **Pod as a Wrapper:** A Pod can contain one or more containers.
- **Shared Resources:** Containers in a Pod share the same Network IP, Port space, and Storage.
- **Sidecar Pattern:** Using multiple containers in a single Pod to perform helper tasks.
- **Lifecycle:** The Pod is the unit of scheduling, not the container.
