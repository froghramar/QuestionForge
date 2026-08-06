---
id: variant.azure-service-bus-dead-letter-replay.azure-service-bus
question: question.azure-service-bus-dead-letter-replay
technology: tech.azure-service-bus
---
# Expected Answer

First inspect the dead-letter reason, description, delivery count, schema version, and correlation IDs to establish whether this is a bug, expired message, or permanently invalid input. Do not automatically replay a DLQ: fix and deploy the producer or consumer problem first, then test the corrected handler with representative messages. Build a controlled replay tool that reads messages, preserves the business and idempotency IDs, sends to the intended active entity, completes the DLQ message only after the send succeeds, and limits throughput. Monitor normal-queue backlog, downstream error rate, duplicates, and the remaining DLQ count. Finally reconcile the affected order IDs against the source of truth so recovery proves business completion rather than just an empty queue.

# Why It Matters

A DLQ is evidence of an uncompleted workflow. Blind replay can duplicate completed work or overload the same broken consumer; deletion destroys the forensic trail needed to recover safely.

# Example Code

```typescript
for (const message of await deadLetterReceiver.receiveMessages(20)) {
  await sender.sendMessages({ body: message.body, messageId: message.messageId, applicationProperties: message.applicationProperties });
  await deadLetterReceiver.completeMessage(message);
}
```

# Common Mistakes

- **Completing a DLQ message before the resend succeeds:** A send failure loses the only retained copy.
- **Replaying before the consumer fix is deployed:** The same messages return to the DLQ and increase operational load.

# Follow-up Questions

- **Why retain the message ID?** (Answer: It enables idempotent consumers to recognize a prior successful effect.)
- **How do you prove recovery?** (Answer: Reconcile source records, successful processing metrics, and the controlled DLQ drain.)

# Related Questions

- [Service Bus: Queue or Topic?](/questions/azure-service-bus-messaging)
- [RabbitMQ: Delayed Retry Design](/questions/rabbitmq-retry-dead-lettering)

# References

- [Azure Service Bus dead-letter queues](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues)
