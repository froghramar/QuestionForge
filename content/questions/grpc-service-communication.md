---
id: question.grpc-service-communication
title: gRPC Service Communication
slug: grpc-service-communication
difficulty: Hard
topic: topic.distributed-systems
estimated_time: 20
updated: 2026-08-06
---

## Why This Is Asked

This tests whether a candidate can choose and operate a contract-first RPC interface for service-to-service communication. Interviewers expect an understanding of Protocol Buffers, streaming, deadlines, error handling, compatibility, and the fact that a remote call can fail in ways a local function call cannot.

## Key Concepts

- **Protocol contracts:** Define services and messages in Protocol Buffers, and evolve fields without reusing numbers or changing their wire meaning.
- **Call styles:** Select unary, server-streaming, client-streaming, or bidirectional streaming based on the interaction and backpressure requirements.
- **Deadlines and cancellation:** Propagate bounded deadlines, honor cancellation, and retry only operations that are safe to repeat.
- **Interoperability:** Account for HTTP/2 infrastructure, load balancing, authentication, observability, and gateway support for browser-facing clients.

## Question Variations

- "When would you choose gRPC over REST for an internal API?"
- "How should a gRPC client use deadlines and retries?"
- "How do you evolve a Protocol Buffers message without breaking old clients?"
- "When is bidirectional streaming a better fit than repeated unary calls?"
