---
id: concept.astro-dynamic-routing
title: Astro Dynamic Routing
slug: astro-dynamic-routing
topic: topic.astro-fundamentals
description: Generating routes based on data using file-based parameters.
---
# Astro Dynamic Routing
Astro supports dynamic path segments using brackets (e.g., `[id].astro` or `[...path].astro`).

### Key Functions
- **getStaticPaths()**: In SSG mode, this function is required to tell Astro which routes to pre-render at build time.
- **Astro.params**: How you access the dynamic segments in the component script.
- **Astro.props**: Passing data from `getStaticPaths` directly to the page to avoid re-fetching.
---
