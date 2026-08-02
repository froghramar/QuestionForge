---
id: concept.k8s-autoscaling
title: Horizontal Pod Autoscaling (HPA)
slug: k8s-autoscaling
topic: topic.orchestration
description: Automatically scaling the number of Pods in a deployment based on observed CPU/Memory utilization.
---
# Horizontal Pod Autoscaling (HPA)

The HPA automatically scales the number of Pods in a Deployment, ReplicaSet, or StatefulSet based on observed CPU utilization (or, with custom metrics support, on some other application-provided metrics).

## 1. How it Works
The HPA is implemented as a control loop. The **Horizontal Pod Autoscaler controller** periodically (default every 15s) queries the resource utilization against the metrics specified in each HPA definition.
- It fetches metrics from the **Metrics Server** (or a custom metrics API).
- It calculates the ratio between current utilization and desired utilization.
- It updates the `replicas` field of the target workload.

## 2. The Formula
`desiredReplicas = ceil[currentReplicas * ( currentMetricValue / desiredMetricValue )]`

## 3. Key Components
- **Metrics Server:** A cluster-wide aggregator of resource usage data.
- **Cool-down / Delay:** To prevent "flapping" (rapidly scaling up and down), HPA has built-in delays (e.g., `stabilizationWindowSeconds`).

## 4. Requirements
For HPA to work based on CPU/Memory, you **must** define `requests` for those resources in your Pod specification. If there are no requests, the HPA won't know what "100% utilization" means and will fail to scale.
