---
id: concept.nextjs-server-actions
title: Next.js Server Actions
slug: nextjs-server-actions
topic: topic.nextjs-fundamentals
description: Asynchronous functions that run on the server and can be called from the client.
---
# Next.js Server Actions

Server Actions are **asynchronous functions** that are executed on the server. Introduced in **Next.js 13.4** and stabilized in **Next.js 14**, they can be used in both Server and Client Components to handle form submissions and data mutations in Next.js applications.

### Key Benefits
- **Zero Client JavaScript:** When used with forms, they can work without client-side JS (Progressive Enhancement).
- **Reduced Boilerplate:** No need to manually create API routes for simple mutations.
- **Type Safety:** Integrated with TypeScript for end-to-end type safety between the form and the server.
- **Cache Integration:** Works seamlessly with `revalidatePath` and `revalidateTag` to update the data cache.
