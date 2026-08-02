---
id: concept.angular-ssr-hydration
title: SSR & Hydration
slug: angular-ssr-hydration
topic: topic.angular-fundamentals
description: Server-side rendering and client-side hydration in modern Angular.
---
# SSR & Hydration
Server-Side Rendering (SSR) is the process of rendering your Angular application on the server and sending the static HTML to the browser. Hydration is the process of making that static HTML interactive again on the client.

Key concepts:
- **Angular Universal:** The older branding for Angular SSR (now integrated into the core CLI).
- **Client-side Hydration:** Introduced in Angular 16/17, it allows Angular to reuse the existing DOM structures rendered by the server rather than destroying and recreating them.
- **`provideClientHydration()`:** The provider used to enable hydration in a standalone app.
- **Partial Hydration:** A future-looking concept where only parts of the page are hydrated as needed (currently an area of active development in the ecosystem).
- **TransferState:** A mechanism to share data from the server to the client to avoid duplicate HTTP requests during hydration.
