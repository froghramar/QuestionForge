---
id: concept.k8s-storage
title: Kubernetes Storage (PV, PVC, and StorageClass)
slug: k8s-storage
topic: topic.orchestration
description: Decoupling storage implementation from application requirements in Kubernetes.
---
# Kubernetes Storage

Kubernetes uses a set of abstractions to manage persistent storage, allowing developers to request storage without knowing the details of the underlying infrastructure (e.g., AWS EBS, GCP PD, or local disks).

## 1. PersistentVolume (PV)
- **Definition:** A piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using a StorageClass.
- **Scope:** It is a cluster-level resource (like a Node) and is not tied to a specific namespace.
- **Lifecycle:** It has a lifecycle independent of any individual Pod that uses it.

## 2. PersistentVolumeClaim (PVC)
- **Definition:** A request for storage by a user.
- **Scope:** It is a namespace-level resource.
- **Function:** Just as a Pod consumes Node resources (CPU/Memory), a PVC consumes PV resources (Size/Access Modes).
- **Binding:** Kubernetes looks for a PV that matches the PVC's requirements and "binds" them together.

## 3. StorageClass
- **Definition:** A way for administrators to describe the "classes" of storage they offer (e.g., "fast-ssd", "slow-hdd").
- **Dynamic Provisioning:** Allows PVs to be created on-demand when a PVC is created, rather than having an admin manually create PVs in advance.

## 4. Access Modes
- **ReadWriteOnce (RWO):** Mounted as read-write by a single node.
- **ReadOnlyMany (ROX):** Mounted as read-only by many nodes.
- **ReadWriteMany (RWX):** Mounted as read-write by many nodes (requires network storage like NFS).
