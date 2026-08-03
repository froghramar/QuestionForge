---
id: concept.nextjs-app-router
title: Next.js App Router
slug: nextjs-app-router
topic: topic.nextjs-fundamentals
description: The modern routing and layout system for Next.js based on React Server Components.
---
# Next.js App Router

The App Router is the modern system for building Next.js applications, introduced in **Next.js 13** and becoming the default in **Next.js 14 and 15**. It is built on React's latest features, including **Server Components** and **Streaming**.

### Key Features
- **Server Components:** Components that run on the server and reduce the amount of JavaScript sent to the client.
- **File-based Routing:** Routes are defined by folders, with `page.js` files acting as the entry point.
- **Nested Layouts:** Easily share UI between routes using `layout.js`.
- **Streaming:** The ability to send chunks of the UI to the client as they are generated.
