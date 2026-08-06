---
id: variant.microservices-boundaries.system-design
question: question.microservices-boundaries
technology: tech.system-design
---
# Expected Answer

Microservices should be drawn around bounded business contexts with clear data and team ownership, not around CRUD tables or technical layers. A service should be able to change, deploy, and operate independently because it owns a cohesive capability and exposes a stable contract. For example, ordering can own order lifecycle rules, inventory owns stock reservation, and payments owns payment authorization. Each controls its own persisted data; a shared database couples schemas, release schedules, and transactional assumptions even if applications are separately deployed.

Cross-service workflows are distributed workflows. Do not attempt a database transaction across services as the default solution. Instead, model each local state change, publish reliable events using an outbox, and use a saga or process manager to coordinate compensations such as releasing inventory after a payment failure. Prefer asynchronous communication for propagation and synchronous calls only when the caller truly requires an immediate answer. Microservices add discovery, observability, deployment, incident response, contract testing, and security overhead, so a modular monolith is often the right starting point until independent scaling, release cadence, or ownership make the boundary valuable.

# Why It Matters

Poor boundaries multiply coordination while delivering none of the autonomy microservices promise. Shared state and chatty call chains make routine deployments risky and turn partial failures into user-visible outages.

# Example Code

```typescript
type OrderPlaced = { type: "order.placed"; orderId: string; sku: string; quantity: number };

async function placeOrder(input: { sku: string; quantity: number }) {
  return db.transaction(async (tx) => {
    const order = await tx.order.create({ data: { ...input, status: "pending" } });
    await tx.outbox.create({ data: { type: "order.placed", payload: JSON.stringify({
      type: "order.placed", orderId: order.id, sku: input.sku, quantity: input.quantity,
    } satisfies OrderPlaced) } });
    return order;
  });
}
```

# Common Mistakes

- **Splitting services by database table:** This creates chatty requests for a single user action and leaves no service with ownership of the business invariant.
- **Sharing one database as an integration API:** Direct reads and joins prevent independent schema changes and bypass each service's rules.
- **Making every interaction synchronous:** A dependency outage then blocks unrelated work and makes the entire system's availability equal to its weakest service.

# Follow-up Questions

- **What is a bounded context?** (Answer: A domain area with a consistent model, language, and ownership boundary.)
- **How does a saga handle failure?** (Answer: It coordinates local transactions and invokes compensating actions when a later step cannot complete.)

# Related Questions

- [Event-Driven Architecture](/questions/event-driven-architecture)
- [gRPC Service Communication](/questions/grpc-service-communication)

# References

- [Microsoft: Microservices architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices)
- [Martin Fowler: Bounded Context](https://martinfowler.com/bliki/BoundedContext.html)
