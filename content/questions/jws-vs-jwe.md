---
id: question.jws-vs-jwe
title: JWS vs JWE
slug: jws-vs-jwe
difficulty: Medium
topic: topic.web-fundamentals
concepts:
  - concept.jwt-security
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Candidates frequently say that JWTs are encrypted when they mean signed. Interviewers ask this to verify that you can select integrity, authenticity, and confidentiality protections deliberately and avoid leaking data in readable token claims.

## Key Concepts

- **JWS:** Signs content to provide integrity and authenticate the signer.
- **JWE:** Encrypts content to provide confidentiality for authorized recipients.
- **Nested tokens:** A design may sign then encrypt, but only when both properties are required.
- **Data minimization:** Most tokens should contain minimal, non-sensitive claims regardless of format.

## Question Variations

- "Can a signed JWT payload be read by its holder?"
- "When would a JWE be appropriate?"
- "Does encryption eliminate JWT validation requirements?"
