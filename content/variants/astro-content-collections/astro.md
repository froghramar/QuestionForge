---
id: variant.astro-content-collections.astro
question: question.astro-content-collections
technology: tech.astro
---
# Expected Answer

**Content Collections** are Astro's built-in solution for managing and validating local content (Markdown, MDX, YAML, or JSON). 

You define your collections in a `src/content.config.ts` file using the `defineCollection` function and a **Zod schema**. Astro then uses this schema to:
1. Validate your frontmatter at build time.
2. Generate TypeScript types so you get autocompletion in your components.

Example configuration:
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

To use this content in a component:
```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog', ({ data }) => !data.draft);
---
<ul>
  {posts.map(post => <li>{post.data.title}</li>)}
</ul>
```

# Why It Matters

In large content sites, it's easy to forget a mandatory field (like a `slug` or `author`) or use the wrong date format. In a traditional site, this might cause a runtime crash or a broken UI. With Content Collections, **Astro will fail the build** if any file is invalid, acting as a powerful unit test for your data.

# Common Mistakes

- **Directly using `fs.readFileSync`**: Bypassing Content Collections means you lose type safety and the optimized build-time caching that Astro provides.
- **Loose Zod Schemas**: Not being strict enough with Zod (e.g., making everything `.optional()`), which leads to more `undefined` checks in your UI code.
- **Ignoring the Cache**: Modifying files outside of the `base` path configured in the loader, which might lead to the dev server not picking up changes.

# Follow-up Questions

- **Can you use external APIs with Content Collections?** (Answer: Yes! Astro 5.0 introduced custom loaders, allowing you to fetch data from a CMS or database and treat it as a collection).
- **How do you handle MDX components with Content Collections?** (Answer: You use the `<Content />` component returned by the `render()` function on a collection entry).
