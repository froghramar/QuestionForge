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

## Question Variations

- "When would you use an Ingress resource instead of a Service of type `LoadBalancer`?"
- "What is an Ingress Controller, and why is it necessary to have one in the cluster?"
- "How does an Ingress handle SSL/TLS termination?"
- "Explain the difference between Layer 4 and Layer 7 load balancing in the context of Kubernetes."
---
