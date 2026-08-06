---
id: variant.event-processing-guarantees.system-design
question: question.event-processing-guarantees
technology: tech.system-design
---
# Expected Answer

At-most-once delivery can lose messages but does not redeliver them. At-least-once delivery retries unacknowledged messages, so a consumer can observe duplicates. Most production business workflows choose at-least-once delivery plus idempotent effects: write a processed event ID with the state transition in one local transaction, or use a natural idempotency key such as a unique payment-provider charge ID. Acknowledge only after that durable work succeeds.

Ordering has a scope. A broker may preserve order for one partition, but unrelated partitions have no global order, and retries can delay one message while another key proceeds. Choose the partition key to match the invariant—often an aggregate ID—and handle old or duplicate events with a version check. "Exactly once" only has meaning for a stated boundary: a broker can ensure one committed read/write sequence, but it cannot automatically make an email provider, database, and payment gateway execute exactly once together. Make the business effect idempotent and observe failures.

# Why It Matters

Confusing delivery guarantees with correctness produces double charges, stale state, and lost notifications after routine crashes. Explicit semantics make failures testable and recoverable.

# Example Code

```typescript
await db.transaction(async (tx) => {
  const inserted = await tx.processedEvents.createMany({ data: { id: event.id }, skipDuplicates: true });
  if (inserted.count === 0) return;
  await tx.balance.update({ where: { id: event.accountId }, data: { cents: { increment: event.delta } } });
});
```

# Common Mistakes

- **Acknowledging before the database transaction commits:** A crash loses the only delivery attempt.
- **Using one partition for every event:** It preserves a needless global order while destroying parallel throughput.

# Follow-up Questions

- **What is an idempotency key?** (Answer: A stable identifier that lets a handler recognize and safely ignore a repeated effect.)
- **Can a broker guarantee exactly-once email delivery?** (Answer: No; external side effects require application-level idempotency or reconciliation.)

# Related Questions

- [Event-Driven Architecture](/questions/event-driven-architecture)
- [CQRS Projection Consistency](/questions/cqrs-projection-consistency)

# References

- [Apache Kafka: Delivery semantics](https://kafka.apache.org/documentation/#semantics)
- [Microsoft: Idempotent message processing](https://learn.microsoft.com/en-us/azure/architecture/patterns/idempotent-message-processing)
