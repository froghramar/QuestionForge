---
id: concept.astro-scripts
title: Client-Side Scripts in Astro
slug: astro-scripts
topic: topic.astro-fundamentals
description: How Astro handles JavaScript intended for the browser.
---
# Client-Side Scripts in Astro
While Astro is "Zero JS by default," you can add interactivity using standard `<script>` tags in your `.astro` components.

### Script Behavior
- **Bundled**: By default, Astro processes, bundles, and minifies scripts.
- **Processed Once**: Even if a component is used multiple times, its script is included in the bundle only once.
- **Directives**:
    - `is:inline`: Skips bundling; the script is included exactly as-is in the HTML.
    - `define:vars`: Passes server-side variables from the frontmatter to the client-side script.
