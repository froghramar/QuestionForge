---
id: variant.nextjs-static-vs-dynamic.nextjs
question: question.nextjs-static-vs-dynamic
technology: tech.nextjs
---

# Expected Answer

Next.js defaults to **Static Rendering** to maximize performance. It switches to **Dynamic Rendering** automatically if it detects:
1.  **Dynamic Functions:** Use of `cookies()`, `headers()`, or the `searchParams` prop in a Page.
2.  **Dynamic Data:** A `fetch` request with `cache: 'no-store'` or `revalidate: 0`.

**Segment Configuration:**
You can manually override this behavior using the `dynamic` variable:
- `auto` (default): Optimizes as much as possible without breaking dynamic behavior.
- `force-dynamic`: Forces dynamic rendering and disables all caching for the route.
- `force-static`: Forces static rendering and returns empty values for dynamic functions.
- `error`: Forces static rendering and throws an error if any dynamic functions are used (useful for ensuring performance).

# Why It Matters

Static rendering is cheaper and faster. However, dynamic rendering is essential for personalization. Knowing the "boundary" between them prevents accidental performance regressions where a static page becomes dynamic because of a single header check.

# Example Code

### Forcing Dynamic Rendering
```typescript
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic';

export default function Page() {
  return <div>This page is rendered on every request.</div>;
}
```

### Ensuring a Page Stays Static
```typescript
// app/blog/page.tsx
export const dynamic = 'error';

export default async function Page() {
  // If you accidentally add cookies() here, the build will fail.
  return <div>Standard Blog List</div>;
}
```

# Common Mistakes

- **Unintentional Dynamic Rendering:** Using `searchParams` on a page you wanted to be fully static and cached.
- **Confusing Route Caching with Data Caching:** A route can be dynamic (rendered on every request) but still use cached data from the Data Cache.
- **Not using `dynamic = 'error'` on critical static routes:** Allowing them to silently become dynamic during development.

# Follow-up Questions

- **Does using `cookies()` in a layout make every page in that layout dynamic?** (Answer: Yes, dynamic functions "bubble up").
- **Can a dynamic route have a cached layout?** (Answer: The layout itself might be static, but if a page is dynamic, the whole response for that request is generated on demand).

# References

- [Next.js Documentation: Static and Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering)
- [Next.js API Reference: Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
