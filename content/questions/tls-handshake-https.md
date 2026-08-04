---
id: question.tls-handshake-https
title: TLS handshake and HTTPS
slug: tls-handshake-https
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.tls
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

This question checks whether a candidate understands what HTTPS actually protects and what it does not. Interviewers look for the roles of certificate authentication, key agreement, encrypted authenticated records, and operational concerns such as certificate validation and TLS termination.

## Key Concepts

- **Authentication:** Clients validate the server certificate and its hostname chain.
- **Key agreement:** TLS 1.3 derives session traffic keys through ephemeral key exchange.
- **Confidentiality and integrity:** Authenticated encryption protects each record after the handshake.
- **Limits:** TLS does not authorize users or make an insecure application safe.

## Question Variations

- "What does a browser verify in a TLS certificate?"
- "Why is TLS 1.3 forward secret?"
- "What is TLS termination at a load balancer?"
- "Why should 0-RTT only be used for replay-safe operations?"
