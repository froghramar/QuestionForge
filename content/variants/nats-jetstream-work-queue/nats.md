---
id: variant.nats-jetstream-work-queue.nats
question: question.nats-jetstream-work-queue
technology: tech.nats
---
# Expected Answer

Use a JetStream stream with work-queue retention and durable consumers for image jobs. The consumer acknowledges only after the resized image is durably stored and the output record is written. If a worker dies before acknowledgement, JetStream redelivers after the acknowledgement wait; the handler must make the output idempotent using the image/job ID. Pull consumers let workers request work at their actual capacity and are a good default for horizontal worker pools. Monitor pending messages, acknowledgement wait expiries, redelivery count, and processing latency. Scale consumers for backlog, but ensure each job has a stable identity so a redelivery does not create multiple stored outputs.

# Why It Matters

Durable work queues absorb upload spikes and recover from worker failures. Acknowledging on receipt or omitting output deduplication trades those benefits for silently lost or duplicated processing.

# Example Code

```typescript
const messages = await consumer.consume();
for await (const message of messages) {
  const job = JSON.parse(sc.decode(message.data));
  await resizeOnce(job.id, job.sourceUrl);
  message.ack();
}
```

# Common Mistakes

- **Acknowledging before writing the image:** A worker crash loses the only durable job copy.
- **Using a transient consumer for a backlog:** Progress disappears when the worker restarts.

# Follow-up Questions

- **Why use a pull consumer?** (Answer: Workers fetch at a controlled rate, supporting natural backpressure.)
- **What triggers redelivery?** (Answer: No acknowledgement before the configured wait or an explicit negative acknowledgement.)

# Related Questions

- [NATS: Survive Consumer Downtime](/questions/nats-core-vs-jetstream)
- [Event Processing Guarantees](/questions/event-processing-guarantees)

# References

- [NATS JetStream consumers](https://docs.nats.io/nats-concepts/jetstream/consumers)
