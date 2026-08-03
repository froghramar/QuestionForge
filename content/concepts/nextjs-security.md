---
id: concept.nextjs-security
title: Next.js Security and Secrets
slug: nextjs-security
topic: topic.nextjs-fundamentals
description: Protecting sensitive information and ensuring secure data handling in Next.js applications.
---
# Next.js Security and Secrets

Next.js provides built-in mechanisms to prevent accidental data leaks and protect your application.

### Environment Variables
- **Private:** Variables in `.env` are only available in the Node.js environment (Server Components, Route Handlers).
- **Public:** Variables prefixed with `NEXT_PUBLIC_` are bundled into the JavaScript sent to the browser.

### Data Tainting (Experimental)
The Taint API (`experimental_taintObjectReference` and `experimental_taintUniqueValue`) allows you to mark specific objects or values as "private," preventing them from being passed to a Client Component.

### Server Actions Security
Server Actions are protected from CSRF by default. However, developers must still implement **Authorization** within the action itself to ensure the current user has permission to perform the task.
