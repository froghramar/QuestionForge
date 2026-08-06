---
id: variant.rabbitmq-retry-dead-lettering.rabbitmq
question: question.rabbitmq-retry-dead-lettering
technology: tech.rabbitmq
---
# Expected Answer

Classify failures before retrying. For a 503 from shipping, publish to a retry path with an attempt count and delayed delivery—either a delayed-message exchange or TTL queues that dead-letter back to the work exchange. Increase delay with each attempt and cap the count. For an invalid address, reject directly to a dead-letter exchange because immediate requeue creates a hot loop that consumes broker and worker capacity without changing the outcome. Preserve the original message, routing key, error class, attempt count, correlation ID, and failure timestamp in dead-letter diagnostics. Fix the underlying problem before a controlled, idempotent replay.

# Why It Matters

Bounded backoff lets transient dependencies recover; immediate requeue can turn one bad payload into an outage.

# Example Code

```typescript
if (isTransient(error) && attempts < 5) {
  await publishRetry({ ...job, attempts: attempts + 1 }, delayMs(attempts));
  channel.ack(message);
} else channel.nack(message, false, false);
```

# Common Mistakes

- **Requeueing every failure immediately:** Poison messages spin indefinitely and starve good work.
- **Dropping the original routing key:** Operators cannot reliably replay after repair.

# Follow-up Questions

- **Why ack after publishing to a retry queue?** (Answer: To avoid retaining the original while a durable retry copy has been created.)
- **What must be idempotent on replay?** (Answer: The business effect, since a prior attempt may have succeeded before reporting failure.)

# Related Questions

- [RabbitMQ: Duplicate Payment Jobs](/questions/rabbitmq-redelivery-idempotency)
- [Service Bus: Replay Dead Letters](/questions/azure-service-bus-dead-letter-replay)

# References

- [RabbitMQ dead lettering](https://www.rabbitmq.com/docs/dlx)
