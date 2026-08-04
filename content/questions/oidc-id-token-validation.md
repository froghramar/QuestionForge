---
id: question.oidc-id-token-validation
title: OIDC ID Token validation
slug: oidc-id-token-validation
difficulty: Hard
topic: topic.web-fundamentals
concepts:
  - concept.openid-connect
  - concept.jwt-security
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

OIDC is often integrated through a library, but a relying party still needs the correct trust boundaries. This question assesses whether a candidate knows that signature verification alone is insufficient and can articulate issuer, audience, nonce, timing, and authorization-code binding checks.

## Key Concepts

- **Issuer and discovery:** Trust is anchored to a configured issuer and its metadata.
- **Audience and authorized party:** The token must be intended for the relying party.
- **Nonce:** Binds the authentication response to the browser request.
- **Code flow binding:** `c_hash` and related checks can bind an ID Token to the authorization response where required.

## Question Variations

- "Which claims must a relying party validate in an ID Token?"
- "What is the OIDC nonce for?"
- "Why must discovery metadata come from a trusted issuer?"
