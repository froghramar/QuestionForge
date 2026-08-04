---
id: question.owasp-broken-access-control
title: Preventing broken access control
slug: owasp-broken-access-control
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.owasp-top-10
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Broken Access Control is A01 in the OWASP Top 10:2025 and a frequent source of severe data exposure. This tests whether a candidate can enforce authorization at the server boundary, differentiate ownership and permission models, and test horizontal and vertical privilege escalation.

## Key Concepts

- **Deny by default:** Permit access only after a server-side policy check.
- **Object-level authorization:** Check access for the specific requested record, not merely that a user is logged in.
- **Function-level authorization:** Check elevated actions and administrative endpoints separately.
- **Testing:** Exercise requests as users from different tenants, roles, and ownership relationships.

## Question Variations

- "What is an IDOR or BOLA vulnerability?"
- "Why is hiding an admin button not authorization?"
- "How would you test multi-tenant object isolation?"
