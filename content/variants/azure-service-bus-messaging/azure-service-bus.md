---
id: variant.azure-service-bus-messaging.azure-service-bus
question: question.azure-service-bus-messaging
technology: tech.azure-service-bus
---
# Expected Answer

Use an Azure Service Bus queue for point-to-point work: competing receivers process each message once from that queue. Use a topic with subscriptions for fan-out: each subscription receives its own copy and can apply filters. The sender is decoupled from receiver availability because Service Bus durably stores messages. Choose entities by business delivery requirements rather than by the number of current consumers; a topic lets new independent reactions be added without changing the producer.

For reliable work, use peek-lock receive mode. Process the message, make the business effect durable and idempotent, then complete it. If the process fails before completion or the lock expires, Service Bus can redeliver it, so duplicate detection belongs in the application. Set a sensible lock duration, renew it only for legitimate long-running work, and use max-delivery counts plus a dead-letter queue for messages that repeatedly fail. Inspect, classify, repair, and explicitly resubmit dead-letter messages; a DLQ is not an automatic recovery system. Sessions can group related messages by session ID and preserve ordered processing within that session.

# Why It Matters

Receive-and-delete can lose work on a consumer crash, while unmonitored dead-letter queues hide production failures. Correct settlement and recovery practices make asynchronous workflows dependable.

# Example Code

```typescript
const receiver = client.createReceiver("orders", { receiveMode: "peekLock" });
const messages = await receiver.receiveMessages(10);
for (const message of messages) {
  try {
    await applyIdempotently(message.messageId!, message.body);
    await receiver.completeMessage(message);
  } catch (error) {
    await receiver.abandonMessage(message);
  }
}
```

# Common Mistakes

- **Using receive-and-delete for important work:** A crash after receipt loses the message with no opportunity for redelivery.
- **Treating the dead-letter queue as a trash bin:** Uninspected poison messages accumulate and leave business workflows incomplete.

# Follow-up Questions

- **Why can peek-lock still produce duplicates?** (Answer: Processing may succeed but completion can fail or the lock can expire before settlement.)
- **When use a topic?** (Answer: When multiple independent subscriptions each need a copy of an event.)

# Related Questions

- [Event Processing Guarantees](/questions/event-processing-guarantees)
- [Microservices Saga Pattern](/questions/microservices-saga-pattern)

# References

- [Azure Service Bus queues, topics, and subscriptions](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions)
- [Azure Service Bus dead-letter queues](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues)
