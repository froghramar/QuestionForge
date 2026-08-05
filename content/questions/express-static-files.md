---
id: question.express-static-files
title: Express Static File Serving
slug: express-static-files
difficulty: Medium
topic: topic.express-fundamentals
estimated_time: 15
updated: 2026-08-05
---

## Why This Is Asked

Static file serving seems simple but intersects with routing, caching, deployment topology, and path safety. Interviewers use it to assess when Express is suitable for the job and when a CDN or reverse proxy is a better boundary.

## Key Concepts

- `express.static` serves files rooted in an explicit directory.
- Mount paths isolate static URLs from application routes.
- Immutable versioned assets can be cached aggressively; HTML generally cannot.
- A CDN or edge server is usually preferable for high-volume public assets.

## Question Variations

- "How do you safely expose a public assets directory in Express?"
- "Why should hashed JavaScript bundles use different cache headers from HTML?"
- "When should static files bypass the Node.js application?"
