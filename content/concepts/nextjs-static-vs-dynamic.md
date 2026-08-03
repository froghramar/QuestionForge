---
id: concept.nextjs-static-vs-dynamic
title: Static vs. Dynamic Rendering
slug: nextjs-static-vs-dynamic
topic: topic.nextjs-fundamentals
description: How Next.js determines whether a route is pre-rendered at build time or rendered on demand.
---
# Static vs. Dynamic Rendering

Next.js automatically determines if a route is **Static** or **Dynamic** based on the features and data-fetching methods used.

### Static Rendering
Next.js renders the route at **build time**, or in the background after data revalidation. The result is cached and can be pushed to a CDN. This is the default behavior.

### Dynamic Rendering
Next.js renders the route for each user at **request time**. This is necessary when the route has data that is unique to the user or only known at the time of the request (e.g., cookies, URL search parameters).

### Switching to Dynamic Rendering
A route will switch to dynamic rendering if:
- **Dynamic Functions** are used: `cookies()`, `headers()`, or `searchParams` in a page.
- **Uncached Data Requests** are used: `fetch` with `cache: 'no-store'` or `revalidate: 0`.
- **Segment Config Options** are set: `export const dynamic = 'force-dynamic'`.
