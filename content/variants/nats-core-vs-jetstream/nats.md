---
id: variant.nats-core-vs-jetstream.nats
question: question.nats-core-vs-jetstream
technology: tech.nats
---
# Expected Answer

Core NATS is a lightweight, subject-based messaging system suited to low-latency, live communication, including request/reply and ephemeral signals. It is best effort: an inactive subscriber does not receive a past publication, so Core NATS should not be the sole transport for business events that must survive outages. Queue groups distribute one subject's messages among active workers for scalable competing-consumer processing.

JetStream adds server-side streams that persist messages, retention policies, consumers, acknowledgements, and replay. Use it when a consumer must catch up after downtime, when an audit or replayable event history matters, or when at-least-once delivery is required. Choose retention and storage deliberately; persistence is not free. A durable consumer stores progress so it can resume, while a transient consumer is appropriate for short-lived work. Design subjects as owned namespaces, for example `orders.created`, and use an idempotent consumer because redelivery remains possible.

# Why It Matters

Choosing Core NATS for durable events silently drops business work when consumers disconnect. Choosing JetStream for every transient signal introduces storage and operational cost without a recovery benefit.

# Example Code

```typescript
const js = nc.jetstream();
await js.publish("orders.created", sc.encode(JSON.stringify({ id: "o-42" })));

const consumer = await js.consumers.get("ORDERS", "billing");
const messages = await consumer.consume();
for await (const message of messages) {
  await charge(JSON.parse(sc.decode(message.data)));
  message.ack();
}
```

# Common Mistakes

- **Expecting Core NATS to replay missed publications:** Core subscriptions only receive messages while active.
- **Acknowledging JetStream before the durable effect:** A crash can then skip the effect even though the broker considers delivery complete.

# Follow-up Questions

- **What does a JetStream durable consumer persist?** (Answer: Its identity and delivery progress, allowing it to resume after a disconnect.)
- **When use a queue group?** (Answer: When several active workers should share processing for one subject.)

# Related Questions

- [Event-Driven Architecture](/questions/event-driven-architecture)
- [RabbitMQ Routing and Reliability](/questions/rabbitmq-routing-reliability)

# References

- [NATS: Core NATS](https://docs.nats.io/nats-concepts/core-nats)
- [NATS: JetStream](https://docs.nats.io/nats-concepts/jetstream)
