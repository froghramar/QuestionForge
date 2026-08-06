---
id: variant.microservices-saga-pattern.system-design
question: question.microservices-saga-pattern
technology: tech.system-design
---
# Expected Answer

A saga coordinates a business workflow that spans services by composing local transactions rather than using one distributed database transaction. In an order flow, the order service records `pending`, inventory reserves stock, and payment authorizes payment. If payment fails after reservation, the workflow asks inventory to release the reservation and marks the order failed. Those compensations are business operations, not literal rollback: a shipped parcel may need a return workflow rather than an impossible deletion.

With choreography, services subscribe to and publish events; it is loosely coupled but the workflow can become hard to see as participants grow. With orchestration, an order workflow service sends commands and tracks state; it adds a coordinator but centralizes visibility, timeouts, retries, and the compensation sequence. Either choice requires durable state, idempotent steps, correlation IDs, time limits, retries, and alerts for stuck workflows. A saga should expose intermediate state to users instead of pretending the whole operation is instantly atomic.

# Why It Matters

Without a saga, a failed step leaves business state stranded: reserved inventory, pending orders, or captured payments with no fulfilled order. Explicit compensations make partial failure recoverable.

# Example Code

```typescript
async function onPaymentFailed(orderId: string, reservationId: string) {
  await inventory.release({ reservationId, idempotencyKey: `release:${orderId}` });
  await orders.markFailed(orderId, "payment_failed");
}
```

# Common Mistakes

- **Calling a compensation a database rollback:** It can fail, be delayed, or have external effects; it needs the same reliability as the forward action.
- **Using events without correlation:** Operators cannot reconstruct which workflow instance a message belongs to or repair it safely.

# Follow-up Questions

- **When prefer orchestration?** (Answer: When the workflow is complex and needs a clear owner, state machine, and operational visibility.)
- **How are stuck sagas recovered?** (Answer: Persist workflow state, retry safe steps within a timeout policy, then alert or route for compensation/manual resolution.)

# Related Questions

- [Microservice Boundaries](/questions/microservice-boundaries)
- [Event-Driven Architecture](/questions/event-driven-architecture)

# References

- [Microsoft: Saga pattern](https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga)
- [Microservices.io: Saga pattern](https://microservices.io/patterns/data/saga.html)
