---
id: question.session-vs-jwt
title: Sessions vs. JWT
slug: session-vs-jwt
difficulty: Medium
topic: topic.web-fundamentals
concepts:
  - concept.auth-types
estimated_time: 15
updated: 2026-08-02
---

## Why This Is Asked

Choosing an authentication strategy is a fundamental architectural decision. Interviewers want to know if you understand the trade-offs between stateful and stateless systems, particularly regarding scalability and security.

## Key Concepts

- **Statefulness:** Where the "truth" of the authentication lives.
- **Scaling:** How each method handles multiple server instances.
- **Revocation:** How to force a user to log out.
- **Security Risks:** XSS (localStorage) vs. CSRF (Cookies).
