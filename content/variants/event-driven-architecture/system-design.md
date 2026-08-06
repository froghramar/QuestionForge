---
id: variant.event-driven-architecture.system-design
question: question.event-driven-architecture
technology: tech.system-design
---
# Expected Answer

Event-driven architecture lets components publish facts that happened and lets interested consumers react asynchronously. An event such as `order.placed` should describe a completed domain fact, carry an event ID and schema version, and have a producer-owned contract. It is not a command: a command asks one owner to do work, while several consumers may independently react to an event. This decouples deployment and absorbs bursts, but makes timing and partial failure explicit.

Assume at-least-once delivery unless the whole end-to-end design proves otherwise. Consumers therefore persist a processed-event ID or make their state transition naturally idempotent before acknowledging the message. A producer must avoid the dual-write gap where a database transaction commits but process failure prevents event publication; write an outbox record in the same transaction and publish it later. Define the ordering scope—usually a key such as order ID, not an entire topic—and use partitions accordingly. Invalid messages need observability and a retry/dead-letter process. Version events additively and retain replay safety so projections can be rebuilt.

# Why It Matters

Events connect services without runtime request chains, but unhandled duplicates, lost publications, or unbounded retries create silently wrong read models. Reliable event handling is a business-correctness concern, not just broker configuration.

# Example Code

```typescript
async function handleOrderPlaced(event: { id: string; orderId: string }) {
  await db.transaction(async (tx) => {
    const seen = await tx.processedEvent.findUnique({ where: { id: event.id } });
    if (seen) return;
    await tx.orderProjection.upsert({ where: { id: event.orderId }, create: { id: event.orderId, status: "placed" }, update: { status: "placed" } });
    await tx.processedEvent.create({ data: { id: event.id } });
  });
}
```

# Common Mistakes

- **Acknowledging a message before durable processing:** A crash after acknowledgement loses the event permanently.
- **Expecting global event order:** Independent partitions and retries do not provide one total sequence across all entities.
- **Publishing after a database commit without an outbox:** A process crash in the gap leaves downstream consumers permanently uninformed.

# Follow-up Questions

- **Why is exactly-once processing difficult?** (Answer: A crash can occur between processing and acknowledgement, so systems usually combine at-least-once delivery with idempotent effects.)
- **What belongs in a dead-letter queue?** (Answer: Messages that exceeded a bounded retry policy, with the error context needed to repair or replay them.)

# Related Questions

- [CQRS Read and Write Models](/questions/cqrs-read-write-models)
- [Microservice Boundaries](/questions/microservice-boundaries)

# References

- [AsyncAPI: Event-driven architecture](https://www.asyncapi.com/docs/concepts/event-driven-architecture)
- [Microsoft: Transactional outbox pattern](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/transactional-outbox-cdc)
