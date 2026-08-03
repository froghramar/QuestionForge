---
id: concept.astro-integration-api
title: Astro Integration API
slug: astro-integration-api
topic: topic.astro-fundamentals
description: The API used to extend Astro's core functionality with new features and tools.
---
# Astro Integration API
Integrations are hooks into the Astro build lifecycle. They allow you to add support for UI frameworks (React, Svelte), CSS tools (Tailwind), or custom build steps.

### Lifecycle Hooks
- **astro:config:setup**: Add new integrations, update config, or inject scripts.
- **astro:server:setup**: Hook into the Vite dev server.
- **astro:build:done**: Run logic after the production build finishes.
