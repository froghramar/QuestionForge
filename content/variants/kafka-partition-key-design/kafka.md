---
id: variant.kafka-partition-key-design.kafka
question: question.kafka-partition-key-design
technology: tech.kafka
---
# Expected Answer

Use `accountId` as the key when account state transitions must be ordered. Kafka maps equal keys to the same partition, which supplies sequence for that account while allowing other accounts to process in parallel. An event ID is a poor key because related events scatter across partitions. Monitor records, bytes, and processing lag per partition to detect skew. A single hot account cannot be split across partitions without relaxing its ordering requirement; address it with domain changes such as serializing that account, batching, or a redesigned sub-key with an explicit merge strategy. Adding partitions improves average capacity but remaps future keys and does not parallelize one existing ordered key.

# Why It Matters

The key encodes an ordering contract. A random key gives throughput but can apply cancellation before creation; a hot key can cap the entire consumer group's throughput.

# Example Code

```typescript
await producer.send({ topic: "account-events", messages: [{ key: event.accountId, value: JSON.stringify(event) }] });
```

# Common Mistakes

- **Keying by event ID:** Related state changes lose partition order.
- **Assuming more partitions split one hot account:** One key still maps to one partition.

# Follow-up Questions

- **What ordering does Kafka provide?** (Answer: Total order within one partition, not across a topic.)
- **How is skew observed?** (Answer: Compare per-partition traffic, consumer lag, and processing latency.)

# Related Questions

- [Kafka: Preserve Per-Order Events](/questions/kafka-consumer-groups)
- [Event Processing Guarantees](/questions/event-processing-guarantees)

# References

- [Kafka design: topics and partitions](https://kafka.apache.org/documentation/#design_topics)
