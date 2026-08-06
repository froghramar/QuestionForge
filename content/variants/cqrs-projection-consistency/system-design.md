---
id: variant.cqrs-projection-consistency.system-design
question: question.cqrs-projection-consistency
technology: tech.system-design
---
# Expected Answer

A CQRS projection is an asynchronously maintained read model, so its freshness must be treated as a product and operational concern. Record a checkpoint or source position after every durable projection update; this lets the worker resume after a crash and exposes lag as a measurable value. Apply source events idempotently so replay and redelivery cannot duplicate rows or counters. If a projection is corrupted, build a new version from the authoritative event stream or write store, validate it, then switch readers instead of manually patching an unknown state.

For read-your-writes behavior, choose explicitly based on the user journey. A command response can return the authoritative aggregate and a `pending` indicator; a client can briefly read the write model; or a request can wait until the read model reaches the command's source position when the latency budget permits. Do not hide asynchronous lag behind a success response and assume the subsequent query will be fresh. Dead-lettering, alerting, and a repair process are required when one projection cannot consume an event.

# Why It Matters

Eventually consistent reads are acceptable only when their delay and recovery behavior are designed. Otherwise users see successful writes disappear from dashboards and teams have no safe way to restore the read model.

# Example Code

```typescript
async function apply(event: { position: bigint; orderId: string; status: string }) {
  await db.transaction(async (tx) => {
    const checkpoint = await tx.checkpoint.findUnique({ where: { name: "orders" } });
    if (checkpoint && checkpoint.position >= event.position) return;
    await tx.orderReadModel.upsert({ where: { id: event.orderId }, create: { id: event.orderId, status: event.status }, update: { status: event.status } });
    await tx.checkpoint.upsert({ where: { name: "orders" }, create: { name: "orders", position: event.position }, update: { position: event.position } });
  });
}
```

# Common Mistakes

- **Updating a checkpoint before the projection:** A crash makes the worker skip data that was never applied.
- **Repairing read rows manually as the normal recovery path:** It leaves no repeatable proof that the projection now reflects source truth.

# Follow-up Questions

- **What does projection lag measure?** (Answer: The time or source-position distance between authoritative writes and the projection's checkpoint.)
- **When should a request wait for a projection?** (Answer: Only where immediate visibility is essential and the bounded wait fits the interaction's latency budget.)

# Related Questions

- [CQRS Read and Write Models](/questions/cqrs-read-write-models)
- [Event Processing Guarantees](/questions/event-processing-guarantees)

# References

- [Microsoft: CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Microsoft: Materialized view pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view)
