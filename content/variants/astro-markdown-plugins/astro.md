---
id: variant.astro-markdown-plugins.astro
question: question.astro-markdown-plugins
technology: tech.astro
---
# Expected Answer

Astro's Markdown and MDX processing can be extended in `astro.config.mjs`.

**Remark vs Rehype:**
- **Remark** plugins deal with the Markdown structure (e.g., converting a shortcut like `:emoji:` to an image).
- **Rehype** plugins deal with the resulting HTML (e.g., adding `loading="lazy"` to all images).

```javascript
// astro.config.mjs
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypeSlug],
  },
});
```

**MDX Custom Components:**
In MDX, you can map standard HTML elements to custom Astro components:
```astro
---
// Layout.astro
import MyImage from '../components/MyImage.astro';
const components = { img: MyImage };
---
<slot components={components} />
```

# Why It Matters

Extending the pipeline allows you to maintain a "Single Source of Truth" in your Markdown files while still having full control over the rendered output. For example, you can use a Rehype plugin to automatically wrap all tables in a responsive `<div>` without having to manually add HTML to every Markdown file.

# Common Mistakes

- **Order of Plugins**: The order in which you list plugins matters. A plugin that expects a specific HTML structure will fail if a previous plugin has significantly altered that structure.
- **Over-processing**: Adding too many complex plugins can slow down the build time significantly, especially on sites with thousands of content files.
- **Mixing MDX and standard Markdown**: Some Remark plugins might work differently or require extra configuration when used with the MDX integration.

# Follow-up Questions

- **How do you pass data from a Remark plugin to the page frontmatter?** (Answer: By modifying the `data.astro.frontmatter` property of the `vfile` in the plugin).
- **What is the `shiki` integration?** (Answer: It is Astro's default high-quality syntax highlighter for code blocks in Markdown).
---
