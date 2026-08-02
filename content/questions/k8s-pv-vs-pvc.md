---
id: question.k8s-pv-vs-pvc
title: PersistentVolume vs. PersistentVolumeClaim
slug: k8s-pv-vs-pvc
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-storage
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Understanding the decoupling of storage is vital for stateful applications. This question tests whether a candidate understands the separation of concerns between the infrastructure (PV) and the application requirements (PVC).

## Key Concepts

- **Abstraction:** Why we don't just point Pods directly at disks.
- **Binding:** How Kubernetes matches claims to volumes.
- **Reclaim Policy:** What happens to the data when the PVC is deleted (Retain vs. Delete).
- **Dynamic Provisioning:** The role of the StorageClass.
---
