---
id: concept.nextjs-advanced-routing
title: Next.js Parallel and Intercepting Routes
slug: nextjs-advanced-routing
topic: topic.nextjs-fundamentals
description: Advanced routing patterns for complex UIs like modals, dashboards, and photo galleries.
---
# Next.js Parallel and Intercepting Routes

Next.js provides advanced routing mechanisms to handle complex UI requirements.

### Parallel Routes
Allow you to simultaneously or conditionally render one or more pages in the same layout. They are defined using "slots" (e.g., `@team` and `@analytics`).
- **Use Case:** Dashboards with independent sections, split-screen views.

### Intercepting Routes
Allow you to load a route from another part of your application within the current layout.
- **Convention:** `(.)` to match segments on the same level, `(..)` for one level above, etc.
- **Use Case:** "Modals" where clicking an image opens it in a modal over the current page, but refreshing the page loads the image on its own page.
