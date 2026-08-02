---
id: question.k8s-ingress-vs-loadbalancer
title: Ingress vs. LoadBalancer Service
slug: k8s-ingress-vs-loadbalancer
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-ingress
  - concept.k8s-architecture
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

Cost and complexity management are key in Kubernetes. This question tests if a candidate understands how to efficiently expose multiple services to the internet using a single entry point rather than provisioning expensive cloud resources for every microservice.

## Key Concepts

- **L4 vs L7:** LoadBalancer (TCP/UDP) vs. Ingress (HTTP/HTTPS).
- **Consolidation:** Using one IP for many services.
- **SSL Termination:** Handling certificates in one place.
- **Ingress Controllers:** The "engine" that powers the Ingress rules.
---
