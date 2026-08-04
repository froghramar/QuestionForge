---
id: question.mutual-tls
title: Mutual TLS and service identity
slug: mutual-tls
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.tls
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

This tests whether a candidate can extend their TLS knowledge from server authentication to service identity. Interviewers expect an explanation of client certificates, their operational lifecycle, and the difference between a cryptographic peer identity and application authorization.

## Key Concepts

- **Mutual authentication:** The server validates a client certificate as well as the client validating the server certificate.
- **PKI operations:** Issuance, rotation, revocation, and trust-bundle distribution are required for mTLS.
- **Service mesh:** A mesh can automate mTLS but does not remove authorization design.
- **Identity vs permission:** A valid client certificate identifies a workload; policy determines what it may do.

## Question Variations

- "When should you use mTLS instead of a bearer token?"
- "What operational challenges does mTLS introduce?"
- "Does mTLS replace application authorization?"
