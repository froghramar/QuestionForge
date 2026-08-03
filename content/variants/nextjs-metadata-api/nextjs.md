---
id: variant.nextjs-metadata-api.nextjs
question: question.nextjs-metadata-api
technology: tech.nextjs
---

# Expected Answer

In the App Router, you handle metadata by exporting either a `metadata` object (static) or a `generateMetadata` function (dynamic) from a `layout.js` or `page.js` file.

**Key Features:**
- **Inheritance:** Metadata defined in a layout is inherited by all child pages. If a page defines its own title, it overrides the layout's title.
- **Dynamic Metadata:** For routes like `/products/[id]`, you use `generateMetadata` to fetch the product details and return the appropriate title, description, and images.
- **Server-Side:** Metadata is computed on the server, ensuring search engines and social media bots can read it even without executing JavaScript.

# Why It Matters

Proper metadata is crucial for SEO and social sharing (OpenGraph). The new API is more type-safe and performant than the old `<Head>` component, as it prevents duplicate tags and handles the merging logic automatically.

# Example Code

### Static Metadata (Layout)

**TypeScript**
```typescript
// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | My Store',
    default: 'My Store',
  },
  description: 'The best products in the world.',
};
```

**JavaScript**
```javascript
// app/layout.js
export const metadata = {
  title: {
    template: '%s | My Store',
    default: 'My Store',
  },
  description: 'The best products in the world.',
};
```

### Dynamic Metadata (Page)

**TypeScript**
```typescript
// app/products/[id]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await fetch(`https://api.example.com/products/${params.id}`).then(res => res.json());

  return {
    title: product.name,
    description: product.summary,
  };
}
```

**JavaScript**
```javascript
// app/products/[id]/page.js
export async function generateMetadata({ params }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`).then(res => res.json());

  return {
    title: product.name,
    description: product.summary,
  };
}
```

# Common Mistakes

- **Using `next/head` in the App Router:** This is deprecated and doesn't work as expected in Server Components.
- **Forgetting the `template` property:** Using a template in the root layout makes it easy to maintain consistent branding across all page titles.
- **Slow `generateMetadata`:** Since `generateMetadata` is awaited before the page starts streaming, expensive data fetching here can delay the Time to First Byte (TTFB).

# Follow-up Questions

- **Can you use metadata in Client Components?** (Answer: No, metadata must be exported from Server Components (Layouts or Pages)).
- **What are file-based metadata?** (Answer: Files like `opengraph-image.png` or `sitemap.ts` that Next.js automatically recognizes and uses to generate the appropriate meta tags or files).

# References

- [Next.js Documentation: Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
