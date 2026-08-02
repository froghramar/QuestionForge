---
id: concept.k8s-deployment-strategies
title: Deployment Strategies (RollingUpdate vs. Recreate)
slug: k8s-deployment-strategies
topic: topic.orchestration
description: Different ways to transition from an old version of an application to a new one.
---
# Kubernetes Deployment Strategies

When you update a Deployment (e.g., change the image version), Kubernetes needs to replace the old Pods with new ones. It offers two primary strategies out of the box.

## 1. RollingUpdate (Default)
- **Mechanism:** Gradually replaces old Pods with new ones. It ensures that a certain number of Pods are always available to serve traffic.
- **Key Parameters:**
    - `maxUnavailable`: The maximum number of Pods that can be unavailable during the update.
    - `maxSurge`: The maximum number of Pods that can be created over the desired number of Pods.
- **Pros:** Zero downtime. If the new version fails its readiness probe, the rollout stops.
- **Cons:** For a period, two different versions of your app will be running simultaneously. Your database schema must support both versions.

## 2. Recreate
- **Mechanism:** Kills all existing Pods before creating new ones.
- **Pros:** Simple. Ensures that only one version of the application is running at any time. No risk of version mismatch during the update.
- **Cons:** Causes **downtime** between the time the old Pods are deleted and the new Pods become ready.

## 3. Advanced Strategies (via Ingress/Service Mesh)
- **Blue/Green:** Run both old (Blue) and new (Green) versions fully, then switch all traffic at once.
- **Canary:** Route a small percentage of traffic (e.g., 5%) to the new version to test it before rolling it out to everyone.
