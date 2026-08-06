---
id: variant.rabbitmq-redelivery-idempotency.rabbitmq
question: question.rabbitmq-redelivery-idempotency
technology: tech.rabbitmq
---
# Expected Answer

Use manual acknowledgements. The worker calls the payment provider with an idempotency key derived from the business payment or RabbitMQ message ID, persists the successful outcome and processed-message record, then acknowledges. If it crashes after charging but before `ack`, RabbitMQ redelivers; the provider or local deduplication record returns the prior result instead of creating a second charge. If the call times out, query the provider by idempotency key before retrying rather than assuming it failed. Automatic acknowledgement is inappropriate because it transfers responsibility before the business effect is durable.

# Why It Matters

At-least-once delivery protects against lost jobs, but only idempotent business handling protects customers from duplicate charges.

# Example Code

```typescript
const key = `payment:${job.orderId}`;
const payment = await provider.charge({ key, cents: job.cents });
await db.processedMessage.upsert({ where: { id: job.messageId }, create: { id: job.messageId, paymentId: payment.id }, update: {} });
channel.ack(message);
```

# Common Mistakes

- **Acknowledging before recording success:** A crash loses the work record and makes recovery ambiguous.
- **Generating a new provider key per retry:** The provider cannot recognize the retry as the same charge.

# Follow-up Questions

- **Where can deduplication live?** (Answer: In the payment provider, a database unique constraint, or both.)
- **What if the provider times out?** (Answer: Look up the stable idempotency key before attempting another charge.)

# Related Questions

- [RabbitMQ: Routing Order Events](/questions/rabbitmq-routing-reliability)
- [Event Processing Guarantees](/questions/event-processing-guarantees)

# References

- [RabbitMQ consumer acknowledgements](https://www.rabbitmq.com/docs/confirms)
