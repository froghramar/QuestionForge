---
id: question.express-api-versioning
title: Express API Versioning
slug: express-api-versioning
difficulty: Hard
topic: topic.express-fundamentals
estimated_time: 20
updated: 2026-08-05
---

## Why This Is Asked

Public API changes require compatibility planning beyond adding a new route. This question assesses how you communicate contracts, isolate incompatible behavior, and retire versions safely.

## Key Concepts

- A version represents a compatibility contract, not a deployment number.
- URL prefixes, media types, and headers are possible versioning mechanisms.
- Breaking changes need an explicit migration and deprecation plan.
- Shared domain logic should not be duplicated merely because transport versions differ.

## Question Variations

- "When does an API change require a new version?"
- "How would you support `/v1` and `/v2` in Express?"
- "How do you sunset an old API version without surprising clients?"
