---
id: variant.astro-rendering-modes.astro
question: question.astro-rendering-modes
technology: tech.astro
---
# Expected Answer

Astro's rendering behavior is controlled by the `output` configuration in `astro.config.mjs` and requires an **Adapter** for non-static builds.

1.  **Static (Default)**: All routes are pre-rendered to HTML at build time.
2.  **Server**: All routes are rendered on-demand when requested.
3.  **Hybrid**: A middle ground where everything is static by default, but you opt-out specific routes:
    ```astro
    ---
    // src/pages/my-dynamic-page.astro
    export const prerender = false;
    // This page will now be server-rendered even in hybrid mode
    ---
    ```

To enable either mode, you must add an adapter:
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'hybrid', // or 'server'
  adapter: node({
    mode: 'standalone',
  }),
});
```

# Why It Matters

**Hybrid Rendering** is the "best of both worlds." It allows you to keep your landing pages and blog posts as lightning-fast static HTML, while still having dynamic routes for user dashboards, search results, or authenticated areas without maintaining two separate applications.

# Common Mistakes

- **Accessing Request Data in Static Mode**: Trying to read `Astro.cookies` or `Astro.request.headers` in a static route will result in a build error or empty data, as there is no request at build time.
- **Forgetting the Adapter**: Setting `output: 'server'` without an adapter will cause the build to fail because Astro doesn't know how to generate the server entry point for your specific platform.
- **Prerendering every page in Hybrid mode**: If you aren't careful, you can end up with a site that is entirely server-rendered, losing the performance benefits of static files.

# Follow-up Questions

- **Can you change the output mode per-environment?** (Answer: Yes, by using environment variables in your `astro.config.mjs`).
- **How do you handle redirects in a static site vs. SSR?** (Answer: In static mode, Astro generates meta-refresh tags or uses platform-specific config. In SSR, it sends a real 301/302 HTTP status code).
