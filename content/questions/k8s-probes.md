---
id: question.k8s-probes
title: Liveness vs. Readiness Probes
slug: k8s-probes
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-probes
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

This question tests a candidate's understanding of how to build resilient, self-healing applications. Knowing the difference between "I'm crashed" (Liveness) and "I'm busy/starting" (Readiness) is crucial for zero-downtime deployments.

## Key Concepts

- **Self-healing:** The difference between restarting and just stopping traffic.
- **Cascading Failures:** How improper readiness checks can crash a cluster.
- **Startup Latency:** Handling apps that take minutes to boot.
- **Status Codes:** Standard ways the app communicates health to the Kubelet.

## Question Variations

- "What is the difference between a Liveness probe and a Readiness probe?"
- "What happens to a Pod if its Liveness probe fails? What if its Readiness probe fails?"
- "How do you configure a probe for an application that takes a long time to start up?"
- "What is a Startup probe, and how does it relate to Liveness and Readiness probes?"
