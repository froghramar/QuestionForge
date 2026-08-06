---
id: variant.kafka-outbox-offsets.kafka
question: question.kafka-outbox-offsets
technology: tech.kafka
---
# Expected Answer

Do not write the order to a database and publish to Kafka as two unrelated operations. A crash after the database commit but before publication leaves downstream services unaware; publishing first can create an event for an order that never commits. Instead, write the order and an outbox row containing a stable event ID in one database transaction. A relay reads pending rows, publishes them to Kafka, and marks them sent. It can safely retry because consumers deduplicate the stable event ID. On the consume side, apply a local state change and processed-event record atomically, then commit the Kafka offset. A crash before the offset commit redelivers a harmless duplicate.

# Why It Matters

The outbox closes a common lost-event gap without pretending a database and broker share one transaction manager.

# Example Code

```typescript
await db.transaction(async (tx) => {
  const order = await tx.order.create({ data: input });
  await tx.outbox.create({ data: { id: crypto.randomUUID(), type: "order.created", payload: JSON.stringify(order) } });
});
```

# Common Mistakes

- **Publishing after commit in application code:** A process crash leaves an unannounced order.
- **Committing the offset before the local write:** A crash loses the consumed effect.

# Follow-up Questions

- **Why is an event ID needed?** (Answer: It gives relays and consumers a stable deduplication identity.)
- **Can Kafka transactions cover an arbitrary database?** (Answer: No; use an outbox or another deliberate cross-system consistency design.)

# Related Questions

- [Kafka: Preserve Per-Order Events](/questions/kafka-consumer-groups)
- [Event-Driven Architecture](/questions/event-driven-architecture)

# References

- [Kafka transactions](https://kafka.apache.org/documentation/#transactions)
- [Transactional outbox pattern](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/transactional-outbox-cdc)
