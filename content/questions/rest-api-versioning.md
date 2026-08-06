---
id: question.rest-api-versioning
title: REST API Versioning
slug: rest-api-versioning
difficulty: Medium
topic: topic.distributed-systems
estimated_time: 15
updated: 2026-08-06
---

## Why This Is Asked

This tests whether a candidate can evolve a public API without unexpectedly breaking existing clients. Interviewers look for compatibility-first design, a reasoned choice of versioning mechanism, and an operational deprecation plan.

## Key Concepts

- **Additive evolution:** Adding optional fields and endpoints is usually safer than changing or removing existing contract elements.
- **Version boundaries:** URI, media-type, header, and query-parameter versioning have different discoverability and caching trade-offs.
- **Deprecation:** Communicate timelines, monitor usage, and provide migration guidance before retiring a version.
- **Contract safety:** Validate compatibility with consumer tests and avoid changing field meanings under the same version.

## Question Variations

- "When should a REST API introduce a new version?"
- "Compare URL and header-based API versioning."
- "How would you retire an API version used by third parties?"
- "Which changes are backward compatible in a JSON response?"
