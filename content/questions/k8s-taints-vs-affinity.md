---
id: question.k8s-taints-vs-affinity
title: Taints and Tolerations vs. Node Affinity
slug: k8s-taints-vs-affinity
difficulty: Hard
topic: topic.orchestration
concepts:
  - concept.k8s-scheduling
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

This is an advanced scheduling question. It tests if the candidate knows the difference between "repelling" Pods from nodes (Taints) vs. "attracting" Pods to nodes (Affinity). It’s crucial for managing specialized hardware and multi-tenant clusters.

## Key Concepts

- **Node-side vs. Pod-side configuration.**
- **Hard vs. Soft constraints.**
- **The "Exclusive Node" use case.**
- **Effects:** `NoSchedule`, `PreferNoSchedule`, `NoExecute`.

## Question Variations

- "What is the difference between 'Node Affinity' and 'Taints and Tolerations'?"
- "When would you use a Taint to 'repel' Pods from a specific node?"
- "Explain the difference between `requiredDuringSchedulingIgnoredDuringExecution` and `preferredDuringSchedulingIgnoredDuringExecution` in Node Affinity."
- "How do you ensure that only specific Pods (e.g., monitoring agents) can run on a tainted node?"
---
