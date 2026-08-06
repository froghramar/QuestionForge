---
id: variant.nats-request-reply-timeouts.nats
question: question.nats-request-reply-timeouts
technology: tech.nats
---
# Expected Answer

Treat NATS request-reply as an RPC boundary. The checkout service publishes a request with an inbox reply subject and waits only until its latency budget expires. A no-responder error means no inventory service is currently subscribed; a timeout means a responder did not answer in time. Both require an explicit product decision: fail checkout, show unavailable, or move to an asynchronous reservation workflow. Retrying a read-only availability check can be safe within a short deadline. Retrying a reserve command needs an idempotency key because the first responder may have succeeded just before its reply was lost. Use JetStream rather than Core NATS when the request must survive consumer downtime or the workflow cannot finish synchronously.

# Why It Matters

An unbounded request path ties checkout availability to a slow dependency. Clear timeouts and side-effect-aware retries prevent cascading failures and duplicate reservations.

# Example Code

```typescript
try {
  const reply = await nc.request("inventory.available", sc.encode(JSON.stringify({ sku })), { timeout: 200 });
  return JSON.parse(sc.decode(reply.data));
} catch (error) { throw new Error("inventory unavailable"); }
```

# Common Mistakes

- **Retrying a reservation as if it were a read:** A delayed first response can reserve stock twice.
- **Using Core NATS for a must-complete workflow:** Offline responders cannot replay past requests.

# Follow-up Questions

- **What is a no-responder result?** (Answer: No active subscription matched the request subject.)
- **When use JetStream instead?** (Answer: When durable delivery, recovery, or asynchronous completion is required.)

# Related Questions

- [NATS: Survive Consumer Downtime](/questions/nats-core-vs-jetstream)
- [gRPC Deadlines and Retries](/questions/grpc-deadlines-retries)

# References

- [NATS request-reply](https://docs.nats.io/nats-concepts/core-nats/reqreply)
