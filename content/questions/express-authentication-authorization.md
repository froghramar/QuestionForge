---
id: question.express-authentication-authorization
title: Express Authentication and Authorization
slug: express-authentication-authorization
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Authentication middleware is easy to demonstrate but easy to get subtly wrong. Interviewers want to see a clear separation between establishing identity and enforcing resource-level permissions.

## Key Concepts

- Authentication verifies credentials and attaches a trusted principal to the request.
- Authorization evaluates whether that principal may perform a specific action on a resource.
- Middleware should fail closed and avoid trusting client-supplied identity fields.
- Token verification requires signature, issuer, audience, expiry, and algorithm controls.

## Question Variations

- "How would you attach an authenticated user to an Express request?"
- "Why is role checking alone insufficient for object-level authorization?"
- "Where should token verification and permission checks live?"
