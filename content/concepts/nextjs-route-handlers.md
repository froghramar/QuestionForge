---
id: concept.nextjs-route-handlers
title: Next.js Route Handlers
slug: nextjs-route-handlers
topic: topic.nextjs-fundamentals
description: Creating custom request handlers for a given route using the Web Request and Response APIs.
---
# Next.js Route Handlers

Route Handlers allow you to create custom request handlers for a given route using the Web **Request** and **Response** APIs. They are the App Router's equivalent of API Routes.

### Key Characteristics
- **File-based:** Defined in `route.ts` or `route.js` files.
- **HTTP Methods:** Supported methods include `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`.
- **Edge & Node.js Runtimes:** Can run in either runtime, depending on configuration.
- **Caching:** `GET` requests are cached by default unless they use dynamic functions (like `cookies()`) or are explicitly opted out.
- **Conflict:** A `route.ts` file cannot exist in the same folder as a `page.ts` file.
