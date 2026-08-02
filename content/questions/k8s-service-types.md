---
id: question.k8s-service-types
title: Kubernetes Service Types
slug: k8s-service-types
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-architecture
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Exposing applications is a core task in Kubernetes. This question tests whether a candidate understands the different ways to route traffic to Pods and when to use internal vs. external exposure.

## Key Concepts

- **ClusterIP:** Internal-only communication.
- **NodePort:** Exposing a service on a static port on each Node's IP.
- **LoadBalancer:** Using a cloud provider's external load balancer.
- **ExternalName:** Mapping a service to a DNS name.
