---
id: question.k8s-requests-vs-limits
title: Resource Requests vs. Limits
slug: k8s-requests-vs-limits
difficulty: Medium
topic: topic.orchestration
concepts:
  - concept.k8s-resources
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

This is a critical operational question. Poorly defined resources lead to either wasted money (requesting too much) or unstable applications (OOM kills and throttling). Interviewers want to see if you can balance cost and reliability.

## Key Concepts

- **Scheduling:** How requests affect where Pods land.
- **Throttling vs. Eviction:** What happens when limits are hit.
- **OOM Kill:** The behavior of the Linux OOM Killer in a containerized environment.
- **Units:** Understanding `m` (millicores) and `Mi/Gi` (mebibytes/gibibytes).

## Question Variations

- "What is the difference between resource 'requests' and 'limits' in Kubernetes?"
- "What happens to a container that exceeds its CPU limit? What about its Memory limit?"
- "How does the Kubernetes scheduler use resource requests when placing Pods on nodes?"
- "What is an 'OOMKill,' and what causes it in a Kubernetes environment?"
---
