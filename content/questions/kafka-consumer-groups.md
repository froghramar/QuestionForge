---
id: question.kafka-consumer-groups
title: "Kafka: Preserve Per-Order Events"
slug: kafka-consumer-groups
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

An order workflow emits created, paid, and cancelled events that must be processed in order for each order while scaling across many orders. This tests partition-key selection, group parallelism, offset commits, and recovery during rebalances.

## Key Concepts

- **Partitions:** Ordering is guaranteed within a partition, commonly selected by a record key.
- **Consumer groups:** One group member owns a partition at a time; separate groups consume the same topic independently.
- **Offsets:** A committed offset records progress and determines where consumption resumes after failure.
- **Rebalances:** Consumers must tolerate partition ownership changes and finish or safely repeat in-flight work.

## Question Variations

- "How do partitions determine Kafka consumer parallelism?"
- "Why can a Kafka consumer process a record more than once?"
- "How do keys affect ordering and data distribution?"
- "What happens during a consumer-group rebalance?"
