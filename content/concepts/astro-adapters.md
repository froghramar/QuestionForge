---
id: concept.astro-adapters
title: Astro Adapters
slug: astro-adapters
topic: topic.astro-fundamentals
description: Plugins that allow Astro sites to be deployed to specific SSR environments.
---
# Astro Adapters
By default, Astro builds a static site. To use Server-Side Rendering (SSR) or Hybrid rendering, you must install an **Adapter** that matches your deployment platform (e.g., Vercel, Netlify, Cloudflare, Node.js).

### Responsibilities
- **Request/Response Mapping**: Translating platform-specific request objects to standard Web APIs.
- **Server Entry Point**: Generating the code necessary to run the Astro engine on the target server/edge.
- **Feature Support**: Enabling platform-specific features like Middleware or Image Optimization.
