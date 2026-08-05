---
id: question.express-testing
title: Express API Testing
slug: express-testing
difficulty: Medium
topic: topic.express-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Testing an HTTP service verifies the behavior clients actually consume. This question assesses whether you can separate application construction from process startup and cover important API boundaries with integration tests.

## Key Concepts

- Export an Express app separately from the code that calls `listen()`.
- Integration tests should assert status, headers, and response contracts.
- Test error paths, authorization, and validation as well as successful requests.
- Test dependencies should be isolated, deterministic, and cleaned up.

## Question Variations

- "Why should an Express app be exported without starting a port in tests?"
- "What belongs in an API integration test versus a unit test?"
- "How would you test authentication middleware?"
