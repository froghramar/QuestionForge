---
id: variant.rabbitmq-routing-reliability.rabbitmq
question: question.rabbitmq-routing-reliability
technology: tech.rabbitmq
---
# Expected Answer

In RabbitMQ, producers publish to an exchange, and bindings determine which queues receive each message. A direct exchange matches an exact routing key, a topic exchange matches dot-separated routing-key patterns, and a fanout exchange sends every message to every bound queue. Consumers normally receive from queues, not exchanges. Start by choosing a queue per independent consumer responsibility; several workers on one queue form competing consumers and each message is handled by one worker.

Reliability requires acknowledgement on both sides. A publisher confirm tells the producer that the broker accepted responsibility for a published message; it does not prove a consumer completed business work. A consumer should manually acknowledge only after its durable effect succeeds. If it crashes first, RabbitMQ can redeliver the message, so the handler must be idempotent. Set prefetch to limit unacknowledged deliveries per consumer; otherwise one slow worker can hold a large backlog. Route repeatedly failing messages to a dead-letter exchange with enough diagnostic metadata to repair or deliberately discard them.

# Why It Matters

Publishing directly to the wrong abstraction or acknowledging too early causes lost work; omitting prefetch can create unfair, high-memory consumers. RabbitMQ topology is part of the business delivery contract.

# Example Code

```typescript
channel.prefetch(10);
await channel.assertExchange("orders", "topic", { durable: true });
await channel.assertQueue("billing", { durable: true });
await channel.bindQueue("billing", "orders", "order.placed");
channel.consume("billing", async (message) => {
  if (!message) return;
  try { await bill(JSON.parse(message.content.toString())); channel.ack(message); }
  catch { channel.nack(message, false, false); }
});
```

# Common Mistakes

- **Acknowledging before the side effect commits:** A crash then loses the message even though billing or storage never finished.
- **Using a fanout exchange for selective routing:** Every bound queue receives every message, wasting work and leaking irrelevant events.

# Follow-up Questions

- **What does prefetch control?** (Answer: The maximum unacknowledged deliveries sent to a consumer, which bounds in-flight work.)
- **Why use publisher confirms?** (Answer: They let a producer retry publication when the broker has not accepted the message.)

# Related Questions

- [Event Processing Guarantees](/questions/event-processing-guarantees)
- [Event-Driven Architecture](/questions/event-driven-architecture)

# References

- [RabbitMQ: Consumer acknowledgements and publisher confirms](https://www.rabbitmq.com/docs/confirms)
- [RabbitMQ: Exchanges](https://www.rabbitmq.com/docs/exchanges)
