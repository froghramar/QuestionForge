---
id: concept.nextjs-auth-patterns
title: Authentication Patterns
slug: nextjs-auth-patterns
topic: topic.nextjs-fundamentals
description: Architectural approaches to handling user sessions and protected routes in the App Router.
---
# Next.js Authentication Patterns

Authentication in Next.js (especially the App Router) revolves around where the session is stored and how it is accessed.

### Session Strategies
1.  **Server-side Sessions (HTTP-only Cookies):** The preferred method for security. Sessions are read in Middleware, Server Components, and Route Handlers.
2.  **Client-side Sessions (JWT in LocalStorage):** Less secure and generally discouraged in modern Next.js apps as they can't be accessed by Server Components during pre-rendering.

### Protection Mechanisms
- **Middleware:** The first line of defense. Used to redirect unauthenticated users before they even reach a page.
- **Server Components:** Checking for a session directly using `cookies()` or a library like Auth.js to conditionally render content.
- **Route Handlers/Actions:** Validating the session before performing any sensitive mutations.
