---
id: question.k8s-deployment-strategies
title: RollingUpdate vs. Recreate Strategy
slug: k8s-deployment-strategies
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-deployment-strategies
  - concept.k8s-probes
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Managing updates is a daily task for DevOps engineers. This question tests whether a candidate understands the trade-offs between zero-downtime (RollingUpdate) and consistency (Recreate), and how to configure them to prevent service interruptions.

## Key Concepts

- **Downtime:** Which strategy causes it and why.
- **Version Skew:** The challenge of running two versions of an app at once.
- **MaxSurge vs. MaxUnavailable:** Fine-tuning the update speed and availability.
- **Rollbacks:** How Kubernetes handles a failed update.

## Question Variations

- "Explain the difference between the `RollingUpdate` and `Recreate` deployment strategies in Kubernetes."
- "What do `maxSurge` and `maxUnavailable` control in a `RollingUpdate`?"
- "Why might you choose a `Recreate` strategy even though it causes downtime?"
- "How do you ensure zero-downtime deployments when updating an application that has long-running connections?"
---
