---
id: question.k8s-workload-types
title: Deployment vs. StatefulSet vs. DaemonSet
slug: k8s-workload-types
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-workloads
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

Choosing the right controller is critical for application stability. Interviewers want to see if you understand the fundamental difference between stateless and stateful applications and how Kubernetes handles node-level infrastructure.

## Key Concepts

- **Stateless vs. Stateful:** Why databases need more care than web APIs.
- **Identity:** Random Pod names vs. predictable ordinal indices.
- **Storage Persistence:** How volumes are mapped to specific Pod instances.
- **Node Coverage:** Ensuring a process runs on every machine in the cluster.
---
