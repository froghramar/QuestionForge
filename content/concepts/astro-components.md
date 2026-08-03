---
id: concept.astro-components
title: Astro Components
slug: astro-components
topic: topic.astro-fundamentals
description: The core building block of Astro, combining a component script and a template.
---
# Astro Components
Astro components (`.astro` files) are HTML-only components with no client-side runtime by default. They consist of two main parts:

### The Component Script (Frontmatter)
Written in TypeScript/JavaScript between `---` fences. This code runs **only on the server** (or at build time) and never reaches the browser. It's used for fetching data, importing other components, and processing logic.

### The Component Template
Written below the second `---` fence. It defines the HTML structure. It supports:
- **JSX-like Expressions**: `{variable}`
- **Slots**: `<slot />` for passing children.
- **Scoped CSS**: `<style>` tags are scoped to the component by default.
