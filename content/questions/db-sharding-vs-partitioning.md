---
id: question.db-sharding-vs-partitioning
title: Sharding vs Partitioning
slug: db-sharding-vs-partitioning
difficulty: Hard
topic: topic.database-fundamentals
estimated_time: 20
updated: 2026-08-01
---

## Why This Is Asked

This question reveals whether you can design databases for scale. Interviewers want to see that you understand the difference between splitting data within a single database (partitioning) and across multiple database servers (sharding), and that you can articulate the operational complexity each introduces.

## Key Concepts

- Partitioning splits a table into smaller pieces within the same database instance (horizontal or vertical)
- Sharding distributes data across multiple independent database servers using a shard key
- Sharding enables horizontal scaling beyond a single machine's limits but introduces cross-shard query complexity
- Cross-shard joins and distributed transactions are expensive and often require denormalization
- Shard key selection is critical: poor keys create hotspots, good keys distribute load evenly
