---
id: variant.cqrs-read-write-models.system-design
question: question.cqrs-read-write-models
technology: tech.system-design
---
# Expected Answer

Command Query Responsibility Segregation (CQRS) separates the model that validates and applies state changes from the models that answer reads. The write side accepts a command, checks authorization and business invariants, changes authoritative state, and emits a durable change notification. The read side consumes those changes to build denormalized projections shaped for specific screens or query patterns. This is valuable when reads and writes have very different scaling, data-shaping, or security needs; it is not an automatic reason to run two databases for a simple CRUD application.

Asynchronous projections introduce eventual consistency. Define how clients will experience it: return the accepted write plus an identifier, show pending state, read from the write store for a short read-your-writes path, or wait for a projection checkpoint when a workflow requires it. Projection handlers must be idempotent, track their source position, and support rebuilding from events or source state after a bug. Monitor projection lag and failures. CQRS is compatible with event sourcing but distinct from it: event sourcing stores domain events as the source of truth; CQRS only separates responsibilities and can use ordinary persisted state.

# Why It Matters

CQRS can make complicated reads fast and keep critical write rules focused, but it also creates data-lag and recovery responsibilities. If a team hides those trade-offs, users see apparently successful updates disappear from search or dashboards.

# Example Code

```typescript
type OrderStatusChanged = { eventId: string; orderId: string; status: "placed" | "cancelled" };

async function projectOrder(event: OrderStatusChanged) {
  await db.transaction(async (tx) => {
    if (await tx.projectionEvent.findUnique({ where: { id: event.eventId } })) return;
    await tx.orderList.upsert({ where: { id: event.orderId }, create: { id: event.orderId, status: event.status }, update: { status: event.status } });
    await tx.projectionEvent.create({ data: { id: event.eventId } });
  });
}
```

# Common Mistakes

- **Applying CQRS to simple CRUD without a concrete read or write problem:** The team pays for replication, monitoring, and recovery without gaining a meaningful benefit.
- **Promising immediate consistency from an asynchronous projection:** Clients read stale data after a successful command and interpret it as data loss.
- **Building projections without replay support:** A bug or failed consumer then requires manual database repair instead of a deterministic rebuild.

# Follow-up Questions

- **How is CQRS different from event sourcing?** (Answer: CQRS separates read and write responsibilities; event sourcing persists events as the authoritative state history.)
- **How can a client get read-your-writes behavior?** (Answer: Read from the write model temporarily, expose pending state, or wait until the relevant projection reaches a known position.)

# Related Questions

- [Event-Driven Architecture](/questions/event-driven-architecture)
- [Optimistic vs Pessimistic Locking](/questions/concurrency-locking-strategies)

# References

- [Microsoft: CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Microsoft: Materialized view pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/materialized-view)
