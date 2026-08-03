---
id: concept.nextjs-error-handling
title: Next.js Error Handling
slug: nextjs-error-handling
topic: topic.nextjs-fundamentals
description: Using convention-based files to handle errors and not-found states in the App Router.
---
# Next.js Error Handling

Next.js provides a robust error-handling system using special files that allow you to define UI for different error scenarios.

### Special Files
- **`error.js`:** Defines an error boundary for a specific segment and its children. It must be a Client Component.
- **`global-error.js`:** A specialized error boundary for the root layout, used to catch errors in the entire application.
- **`not-found.js`:** Used to render a UI when the `notFound()` function is called or when a route doesn't match.
- **`loading.js`:** While primarily for streaming, it also handles the "loading" state during data fetching.

### How it works
When an error occurs in a component, Next.js will bubble it up to the nearest `error.js` boundary. This allows the rest of the application to remain functional while the specific segment shows a fallback UI.
