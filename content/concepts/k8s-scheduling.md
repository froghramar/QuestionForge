---
id: concept.k8s-scheduling
title: Kubernetes Scheduling (Taints, Tolerations, and Affinity)
slug: k8s-scheduling
topic: topic.orchestration
description: How to control which nodes run which Pods using various scheduling constraints.
---
# Kubernetes Scheduling Controls

By default, the Kubernetes scheduler tries to balance Pods across nodes. However, you often need to override this behavior for performance, security, or infrastructure reasons.

## 1. Taints and Tolerations
- **Taints:** Applied to **Nodes**. They allow a node to "repel" a set of pods. A taint has a `key`, `value`, and `effect` (e.g., `NoSchedule`).
- **Tolerations:** Applied to **Pods**. They allow (but do not require) the pod to schedule onto nodes with matching taints.
- **Use Case:** Dedicating nodes to a specific team or specialized hardware (like GPUs).

## 2. Node Affinity
- **Definition:** Applied to **Pods**. It is a set of rules used by the scheduler to determine where a pod *can* be placed, based on labels on the node.
- **Types:**
    - `requiredDuringSchedulingIgnoredDuringExecution`: Hard requirement (must match).
    - `preferredDuringSchedulingIgnoredDuringExecution`: Soft requirement (try to match).
- **Use Case:** Ensuring a Pod runs on a node with an SSD or in a specific Availability Zone.

## 3. Pod Affinity and Anti-Affinity
- **Affinity:** Keep related Pods together on the same node (e.g., an app and its cache) to reduce latency.
- **Anti-Affinity:** Keep Pods apart (e.g., don't put two replicas of the same DB on the same node) to ensure high availability.

## Summary Comparison
| Feature | Applied To | Goal |
| :--- | :--- | :--- |
| **Taints** | Nodes | Keep Pods away. |
| **Tolerations** | Pods | Allow Pods to stay on tainted nodes. |
| **Node Affinity** | Pods | Pull Pods toward specific nodes. |
| **Pod Anti-Affinity** | Pods | Keep Pods away from other Pods. |
