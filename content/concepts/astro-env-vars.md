---
id: concept.astro-env-vars
title: Environment Variables & Security
slug: astro-env-vars
topic: topic.astro-fundamentals
description: Managing secrets and public variables safely in Astro.
---
# Environment Variables & Security
Astro uses Vite's environment variable handling but adds its own layer of security to prevent accidental leaks.

### Variable Types
- **Private Variables**: Defined in `.env` without a prefix. These are only available in the Astro frontmatter and API routes (server-side).
- **Public Variables**: Prefixed with `PUBLIC_` (e.g., `PUBLIC_ANALYTICS_ID`). These are accessible on both the server and the client.

### Data Validation
Astro supports a `cvs` (config validation schema) for environment variables using the `astro:env` module (Astro 4.x+), allowing you to define types and default values for your variables.
