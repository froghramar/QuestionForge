---
id: question.azure-service-bus-messaging
title: "Service Bus: Queue or Topic?"
slug: azure-service-bus-messaging
difficulty: Medium
topic: topic.distributed-systems
estimated_time: 15
updated: 2026-08-06
---

## Why This Is Asked

An order event must trigger shipping, analytics, and customer notifications, while a PDF-rendering task must run once. This tests whether a candidate can select queues or topics and design reliable receive and recovery behavior.

## Key Concepts

- **Queues and topics:** Queues distribute one message to one competing consumer; topics fan copies out to subscriptions.
- **Peek-lock:** A consumer completes a message only after successful processing; failures permit redelivery.
- **Dead-letter queues:** Poisoned or expired messages require inspection, remediation, and an explicit replay decision.
- **Sessions:** A session ID can preserve ordered processing for related messages while still allowing parallel sessions.

## Question Variations

- "When should you use a queue rather than a topic subscription?"
- "How does peek-lock delivery lead to duplicate processing?"
- "What belongs in a dead-letter queue recovery process?"
- "How do Service Bus sessions preserve order?"
