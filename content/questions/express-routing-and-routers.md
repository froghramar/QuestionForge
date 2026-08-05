---
id: question.express-routing-and-routers
title: Express Routing and Routers
slug: express-routing-and-routers
difficulty: Medium
topic: topic.express-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Interviewers use routing questions to evaluate whether you can organize an HTTP API as it grows without coupling every endpoint to one application object. They also assess whether you understand path parameters, route matching, and middleware composition.

## Key Concepts

- Route handlers match an HTTP method and path, then end the response or delegate with `next()`.
- `express.Router()` creates a mountable, modular route subtree.
- Middleware mounted on a router runs only for requests that enter that router.
- Route parameters are strings and should be validated before use.

## Question Variations

- "How would you split a large Express API into route modules?"
- "What is the difference between `app.use()` and `app.get()`?"
- "How do route parameters and query parameters differ?"
