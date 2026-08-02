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

## Question Variations

- "Compare session-based authentication with Token-based (JWT) authentication."
- "What are the security implications of storing a JWT in `localStorage` versus an `HttpOnly` cookie?"
- "How do you handle token revocation with JWTs if they are stateless?"
- "Why might you choose sessions over JWTs for a monolith application?"
