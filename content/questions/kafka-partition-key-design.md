---
id: question.kafka-partition-key-design
title: "Kafka: Choosing a Partition Key"
slug: kafka-partition-key-design
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

An event stream has strict ordering requirements per account, but a small number of accounts generate most traffic. This tests whether a candidate can choose a key that preserves the needed order while detecting and mitigating hot partitions.

## Key Concepts

- **Ordering boundary:** Records sharing a key map to the same partition and retain order there.
- **Key selection:** Choose the aggregate whose state transition requires sequence, not an arbitrary or random identifier.
- **Skew:** Hot keys cannot be parallelized within one ordered partition and must be handled by domain-level strategies.
- **Evolution:** Increasing partitions changes key-to-partition mapping and must not be mistaken for a repair of existing ordering.

## Question Variations

- "Why use `accountId` rather than `eventId` as a Kafka key?"
- "How would you detect a hot Kafka partition?"
- "Can adding partitions fix a single hot account?"
