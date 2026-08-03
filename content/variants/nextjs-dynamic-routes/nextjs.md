---
id: variant.nextjs-dynamic-routes.nextjs
question: question.nextjs-dynamic-routes
technology: tech.nextjs
---

# Expected Answer

In the Next.js App Router, dynamic routes are created by wrapping a folder name in brackets, like `app/blog/[slug]/page.tsx`.

To pre-render these routes at build time (Static Site Generation), you use the `generateStaticParams` function:

1.  **`generateStaticParams`:** An `async` function that returns an array of objects, where each object represents the route parameters.
2.  **`dynamicParams`:** A configuration option (boolean). If `true` (default), segments not generated at build time are generated on-demand (SSR). If `false`, they return a 404.

**Catch-all Segments:**
- `[...slug]`: Matches `/blog/a`, `/blog/a/b`, but NOT `/blog`.
- `[[...slug]]` (Optional Catch-all): Matches `/blog`, `/blog/a`, and `/blog/a/b`.

# Why It Matters

Efficiently handling dynamic routes is key to balancing build times and user experience. Pre-rendering the most popular pages makes them instant, while allowing others to be generated on-demand keeps build times manageable for large sites.

# Example Code

### Basic `generateStaticParams`

**TypeScript**
```typescript
// app/posts/[id]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then((res) => res.json());

  return posts.map((post: any) => ({
    id: post.id.toString(),
  }));
}

export default function PostPage({ params }: { params: { id: string } }) {
  return <div>Post ID: {params.id}</div>;
}
```

**JavaScript**
```javascript
// app/posts/[id]/page.js
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then((res) => res.json());

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function PostPage({ params }) {
  return <div>Post ID: {params.id}</div>;
}
```

### Catch-all Route
```typescript
// app/shop/[[...slug]]/page.tsx
export default function Page({ params }: { params: { slug?: string[] } }) {
  // params.slug will be undefined for /shop
  // params.slug will be ['electronics', 'phones'] for /shop/electronics/phones
  return <div>...</div>;
}
```

# Common Mistakes

- **Returning numbers instead of strings:** In `generateStaticParams`, all parameter values must be strings.
- **Forgetting `dynamicParams = false` for strictly static sites:** If you want to ensure only a specific set of pages exists, you must opt-out of on-demand generation.
- **Over-using catch-all routes:** This can make your routing logic complex and harder to debug. Use them only when the structure is truly nested or unknown.

# Follow-up Questions

- **Can you use `generateStaticParams` with a parent layout?** (Answer: Yes. Parameters generated in a layout are passed down to child layouts and pages).
- **How does `generateStaticParams` interact with fetch caching?** (Answer: If you use the same `fetch` call in `generateStaticParams` and the Page, Next.js will memoize the request so it's only called once).

# References

- [Next.js Documentation: Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js API Reference: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
