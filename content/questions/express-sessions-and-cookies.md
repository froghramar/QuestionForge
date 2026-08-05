---
id: question.express-sessions-and-cookies
title: Express Sessions and Cookies
slug: express-sessions-and-cookies
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Stateful browser authentication requires careful cookie and session design. Interviewers use this question to assess whether you understand the difference between a client-side cookie and server-side session state, including the related security controls.

## Key Concepts

- Cookies hold small client-stored values; sessions usually keep state on the server and put an opaque identifier in a cookie.
- `Secure`, `HttpOnly`, and `SameSite` address distinct threats.
- Session stores must be shared and durable when an application is replicated.
- Session rotation and expiry limit the impact of stolen identifiers.

## Question Variations

- "What should be stored in an Express session cookie?"
- "Why is the default in-memory session store unsuitable for production?"
- "How do cookie flags relate to CSRF and XSS?"
