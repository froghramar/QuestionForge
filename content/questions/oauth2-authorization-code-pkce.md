---
id: question.oauth2-authorization-code-pkce
title: OAuth 2.0 authorization code with PKCE
slug: oauth2-authorization-code-pkce
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.oauth2
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

This tests whether a candidate can design delegated authorization for browser, mobile, and server applications without exposing long-lived credentials. Interviewers look for the correct roles and an understanding of why authorization code flow with PKCE prevents intercepted authorization codes from being redeemed by another client.

## Key Concepts

- **Roles:** Resource owner, client, authorization server, and resource server have different responsibilities.
- **Authorization code:** A short-lived, one-time artifact exchanged at the token endpoint.
- **PKCE:** Binds the authorization request to the token exchange using a verifier and challenge.
- **Redirect URI and state:** Exact redirect matching and a state value protect the response and browser flow.

## Question Variations

- "Why is the implicit grant no longer recommended?"
- "How does PKCE protect a public client?"
- "What is the purpose of the state parameter?"
- "How should a SPA store and use access tokens?"
