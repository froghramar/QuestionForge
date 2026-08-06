---
id: variant.grpc-deadlines-retries.system-design
question: question.grpc-deadlines-retries
technology: tech.system-design
---
# Expected Answer

Every gRPC call should have a deadline that represents the remaining end-to-end latency budget. The receiving server exposes cancellation when the deadline expires; it must stop work and propagate the remaining budget to any downstream RPCs. Resetting a 500 ms timeout at every hop permits a short request path to run for seconds and exhausts resources during a dependency slowdown.

Retry only a bounded set of transient errors, such as an unavailable endpoint, and only when the request is idempotent or protected by an idempotency key. Use exponential backoff with jitter and a retry budget. Do not retry client errors, expired deadlines, or operations whose effects cannot safely happen twice. Combine retries with circuit breakers, concurrency limits, and load shedding: during an outage, naïve retries multiply traffic precisely when the dependency has least capacity. Observe attempts, status codes, and deadline expirations separately from final failures so policy can be tuned from evidence.

# Why It Matters

Deadline-free calls and unbounded retries turn one slow service into a cascading outage. Correct policy protects callers and gives degraded dependencies time to recover.

# Example Code

```typescript
const deadline = new Date(Date.now() + 300);
try {
  return await inventory.reserve(request, { deadline });
} catch (error) {
  if (error.code === "UNAVAILABLE" && request.idempotencyKey) return retryWithJitter(request, deadline);
  throw error;
}
```

# Common Mistakes

- **Using an unlimited client default:** Hung calls retain sockets and work long after the user has left.
- **Retrying beyond the original deadline:** The request is no longer valuable and only adds load to a failing dependency.

# Follow-up Questions

- **What does deadline propagation prevent?** (Answer: Each hop consuming a full timeout independently and exceeding the caller's total latency budget.)
- **Why add jitter?** (Answer: It prevents many clients from retrying in synchronized bursts.)

# Related Questions

- [gRPC Service Communication](/questions/grpc-service-communication)
- [Microservice Boundaries](/questions/microservice-boundaries)

# References

- [gRPC: Deadlines](https://grpc.io/docs/guides/deadlines/)
- [gRPC: Retry](https://grpc.io/docs/guides/retry/)
