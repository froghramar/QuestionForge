---
id: concept.k8s-workloads
title: Kubernetes Workload Types
slug: k8s-workloads
topic: topic.orchestration
description: Different controllers for managing Pod lifecycles based on application needs.
---
# Kubernetes Workload Types

Kubernetes provides several built-in workload resources to manage Pods. Each is designed for a specific type of application behavior.

## 1. Deployment (The Most Common)
Used for **stateless** applications (like web servers).
- Manages a set of identical Pods (ReplicaSet).
- Supports declarative updates (rolling updates) and rollbacks.
- Pods are interchangeable and have random names (e.g., `web-789abc-xyz`).

## 2. StatefulSet
Used for **stateful** applications (like databases or distributed systems).
- Provides a stable, unique network identifier (e.g., `db-0`, `db-1`).
- Provides stable, persistent storage linked to each specific Pod.
- Maintains a strict ordering for deployment, scaling, and termination.

## 3. DaemonSet
Ensures that all (or some) Nodes run a copy of a Pod.
- Useful for infrastructure-related tasks like log collection (Fluentd), node monitoring (Prometheus Node Exporter), or storage drivers.
- Automatically adds Pods to new nodes and removes them from deleted nodes.

## 4. Job & CronJob
- **Job:** Creates one or more Pods and ensures that a specified number of them successfully terminate. Useful for one-off tasks like database migrations.
- **CronJob:** Runs Jobs on a time-based schedule (like a Linux crontab).
