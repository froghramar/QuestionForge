---
id: concept.astro-island-architecture
title: Island Architecture
slug: astro-island-architecture
topic: topic.astro-fundamentals
description: A design pattern that minimizes client-side JavaScript by hydrating only interactive UI components.
---
# Island Architecture
Island Architecture is a pattern where the server renders the entire page to static HTML, and "islands" of interactivity (framework components like React, Vue, or Svelte) are hydrated independently.

### Key Benefits
- **Zero JS by Default**: The majority of the page remains static HTML, reducing the payload.
- **Independent Hydration**: Components load and become interactive without waiting for the rest of the page.
- **Partial Hydration**: You only ship JavaScript for the parts of the page that actually need it.
