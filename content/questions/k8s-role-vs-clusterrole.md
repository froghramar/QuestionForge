---
id: question.k8s-role-vs-clusterrole
title: Role vs. ClusterRole
slug: k8s-role-vs-clusterrole
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-rbac
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Security is a top priority in Kubernetes. This question tests whether a candidate understands how to isolate permissions and follow the principle of least privilege. Knowing when to use namespace-scoped vs. cluster-scoped permissions is fundamental to cluster security.

## Key Concepts

- **Namespacing:** How Roles are restricted to a single namespace.
- **Aggregation:** How ClusterRoles can be used to grant permissions across all namespaces.
- **ServiceAccounts:** The primary way applications authenticate with the API.
- **Binding:** The link between the permission (Role) and the identity (Subject).
---
