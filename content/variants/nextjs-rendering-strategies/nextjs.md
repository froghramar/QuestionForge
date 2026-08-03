---
id: variant.nextjs-rendering-strategies.nextjs
question: question.nextjs-rendering-strategies
technology: tech.nextjs
---

# Expected Answer

Next.js offers several ways to render content, each suited for different use cases:

1.  **Static Site Generation (SSG):** HTML is generated at **build time**. This is the most performant method. In the **Pages Router**, this uses `getStaticProps`. In the **App Router (Next.js 13+)**, this is the default behavior for `fetch` requests unless opted out.
2.  **Server-Side Rendering (SSR):** HTML is generated on **each request**. In the **Pages Router**, this uses `getServerSideProps`. In the **App Router**, you opt-in by setting `cache: 'no-store'` in `fetch` or using dynamic functions.
3.  **Incremental Static Regeneration (ISR):** Allows you to update static pages **after build time**. Introduced in **Next.js 9.5**, it scales well for large sites.
4.  **Client-Side Rendering (CSR):** Only the initial shell is sent from the server, and the browser fetches data and renders the rest. Used for highly interactive dashboards or parts of a page that don't need SEO.

# Why It Matters

Choosing the wrong strategy can lead to slow TTI (Time to Interactive), poor SEO, or high server costs. SSG is preferred for performance, but ISR is often the "sweet spot" for modern apps, combining static speed with dynamic updates.

# Example Code

### SSG / ISR (App Router)

**TypeScript**
```typescript
// app/blog/[slug]/page.tsx
async function getPageData(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
  });
  return res.json();
}
```

**JavaScript**
```javascript
// app/blog/[slug]/page.js
async function getPageData(slug) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 60 }
  });
  return res.json();
}
```

### SSR (App Router)

**TypeScript**
```typescript
// Force dynamic rendering (no cache)
async function getDynamicData() {
  const res = await fetch('https://api.example.com/stats', {
    cache: 'no-store'
  });
  return res.json();
}
```

**JavaScript**
```javascript
// Force dynamic rendering (no cache)
async function getDynamicData() {
  const res = await fetch('https://api.example.com/stats', {
    cache: 'no-store'
  });
  return res.json();
}
```

# Common Mistakes

- **Using SSR for everything:** This increases server load and TTFB (Time to First Byte) unnecessarily.
- **Forgetting about `revalidate` in ISR:** Leaving it at build-only for content that actually changes.
- **Fetching secret data on the client:** Exposing API keys or sensitive information in the browser.

# Follow-up Questions

- **What happens during the revalidation period in ISR?** (Answer: The first visitor after the period triggers a background regeneration. They get the stale page, and subsequent visitors get the new page).
- **How do you handle private data with SSG?** (Answer: You usually can't pre-render private data. You either use SSR or fetch that specific piece of data on the client).

# References

- [Next.js Documentation: Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [Next.js Documentation: Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
