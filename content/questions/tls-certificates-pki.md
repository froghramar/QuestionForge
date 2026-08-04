---
id: question.tls-certificates-pki
title: TLS certificates and PKI
slug: tls-certificates-pki
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.tls
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

This assesses the trust model behind HTTPS rather than only TLS encryption. Interviewers want candidates to explain certificate chains, hostname validation, renewal, and the operational impact of expired or incorrectly deployed certificates.

## Key Concepts

- **Certificate chain:** A leaf certificate is validated through intermediate CAs to a trusted root.
- **Hostname validation:** The requested DNS name must match a SAN in the leaf certificate.
- **Private keys:** The corresponding secret key must be protected and rotated if compromised.
- **Automation:** ACME and managed certificate services reduce expiry and deployment failures.

## Question Variations

- "What does a browser validate in an HTTPS certificate?"
- "Why is a certificate for one domain not valid for another?"
- "What is the difference between a root and intermediate CA?"
