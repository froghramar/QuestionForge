---
id: question.k8s-hpa
title: Horizontal Pod Autoscaler (HPA)
slug: k8s-hpa
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-autoscaling
  - concept.k8s-resources
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

Dynamic scaling is one of the primary reasons companies move to Kubernetes. This question tests whether a candidate knows how to configure automatic scaling, the requirements for it to function (Metrics Server and Resource Requests), and how to prevent common issues like flapping.

## Key Concepts

- **Control Loop:** How often the HPA checks metrics.
- **Resource Requests:** Why they are mandatory for HPA.
- **Metrics Server:** The source of truth for resource usage.
- **Flapping:** What it is and how to prevent it.

## Question Variations

- "What is the Horizontal Pod Autoscaler (HPA), and how does it determine when to scale?"
- "Why are resource 'requests' mandatory for the HPA to work correctly?"
- "What is 'flapping' in the context of autoscaling, and how can you configure the HPA to avoid it?"
- "Can the HPA scale based on custom metrics (like request count) instead of just CPU or Memory?"
---
