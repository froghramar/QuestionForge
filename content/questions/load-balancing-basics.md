---
id: question.load-balancing-basics
title: Load Balancing Basics
slug: load-balancing-basics
difficulty: Medium
topic: topic.distributed-systems
concepts:
  - concept.load-balancing
estimated_time: 10
updated: 2026-08-02
---

## Why This Is Asked

This is a fundamental System Design question. It tests whether a candidate knows how to scale an application horizontally and how to ensure the system remains available even if individual servers fail.

## Key Concepts

- **Horizontal Scaling:** Adding more machines instead of bigger machines.
- **High Availability (HA):** Removing single points of failure.
- **Algorithms:** Knowing the trade-offs between Round Robin, Least Connections, and IP Hash.
- **Session Persistence (Sticky Sessions):** The challenge of keeping a user on the same server.
