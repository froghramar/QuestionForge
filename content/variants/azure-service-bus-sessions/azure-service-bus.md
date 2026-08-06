---
id: variant.azure-service-bus-sessions.azure-service-bus
question: question.azure-service-bus-sessions
technology: tech.azure-service-bus
---
# Expected Answer

Set `sessionId` to the order ID on every event in that order's workflow. Service Bus grants one receiver an exclusive lock for a session, so that receiver processes the order's events in sequence. Different order sessions can be accepted by different workers at the same time, preserving parallelism. Keep session work bounded and renew the lock only when genuine processing needs more time. If the receiver loses the lock or crashes before completion, messages can be delivered again, so use idempotent state transitions and do not mistake sessions for exactly-once processing. A session enforces ordering only within the same session ID; unrelated orders have no global order.

# Why It Matters

Without session-scoped ordering, cancellation can race ahead of creation. A single global queue would avoid that race but unnecessarily serializes every order and caps throughput.

# Example Code

```typescript
await sender.sendMessages({ body: event, messageId: event.id, sessionId: event.orderId });
const receiver = client.acceptSession("orders", event.orderId);
const message = await receiver.receiveMessages(1);
await applyOrderEvent(message[0].body);
await receiver.completeMessage(message[0]);
```

# Common Mistakes

- **Using a random session ID:** Related events no longer share ordered processing.
- **Holding a session lock during slow external work:** Lock loss causes redelivery and duplicate external effects.

# Follow-up Questions

- **Does a session order all messages in a queue?** (Answer: No; it orders messages sharing one session ID.)
- **How is throughput scaled?** (Answer: Run multiple processors that each accept different sessions.)

# Related Questions

- [Service Bus: Queue or Topic?](/questions/azure-service-bus-messaging)
- [Kafka: Choosing a Partition Key](/questions/kafka-partition-key-design)

# References

- [Azure Service Bus message sessions](https://learn.microsoft.com/en-us/azure/service-bus-messaging/message-sessions)
