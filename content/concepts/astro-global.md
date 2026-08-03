---
id: concept.astro-global
title: The Astro Global Object
slug: astro-global
topic: topic.astro-fundamentals
description: The built-in global object available in all Astro components.
---
# The Astro Global Object
The `Astro` global is available in the frontmatter of all `.astro` files. It provides context about the current request and the component itself.

### Key Properties
- **`Astro.props`**: Access data passed to the component.
- **`Astro.url`**: Information about the current URL (path, search params).
- **`Astro.cookies`**: Get and set cookies (in SSR mode).
- **`Astro.request`**: Access the standard Web Request object (headers, method).
- **`Astro.redirect()`**: Programmatically redirect to another page.
---
