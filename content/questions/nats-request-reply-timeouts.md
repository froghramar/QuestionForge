---
id: question.nats-request-reply-timeouts
title: "NATS: Request-Reply Timeouts"
slug: nats-request-reply-timeouts
difficulty: Medium
topic: topic.distributed-systems
estimated_time: 15
updated: 2026-08-06
---

## Why This Is Asked

A checkout service uses NATS request-reply to ask inventory for availability, but inventory may be slow or unavailable. This tests deadline design, no-responder handling, retry safety, and the difference between an RPC path and durable event processing.

## Key Concepts

- **Inbox replies:** A requester uses a reply subject and waits for a bounded response.
- **Timeouts:** A caller must bound waiting time and translate timeout or no-responder outcomes deliberately.
- **Retry safety:** Retrying an availability query differs from retrying a reservation command with side effects.
- **Service discovery:** NATS subject subscriptions decouple requesters from a fixed host address.

## Question Variations

- "How should checkout handle a NATS no-responder error?"
- "Which request-reply calls are safe to retry?"
- "When should this interaction become an asynchronous JetStream workflow?"
