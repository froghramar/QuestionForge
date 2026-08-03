---
id: variant.nextjs-caching-mechanisms.nextjs
question: question.nextjs-caching-mechanisms
technology: tech.nextjs
---

# Expected Answer

Next.js uses a multi-layered caching strategy:

1.  **Request Memoization:** React caches `fetch` calls with the same signature. If you call `fetch('/api/user')` in three different components in the same tree, only one network request is made. This is per-request and does not need configuration.
2.  **Data Cache:** This is Next.js-specific and persistent across requests. It's stored on the server. You opt-out with `cache: 'no-store'` or `revalidate: 0`.
3.  **Full Route Cache:** Caches the HTML and RSC payload on the server. Only applies to static routes.
4.  **Router Cache:** A client-side, in-memory cache. It stores the RSC payload in the browser. It's cleared on page refresh but persists during SPA-like navigation.

**To revalidate data:**
- **Time-based:** `fetch(url, { next: { revalidate: 3600 } })`
- **On-demand:** Use `revalidatePath('/dashboard')` or `revalidateTag('settings')` inside a Server Action or Route Handler.

# Why It Matters

Misunderstanding caching leads to "it works on my machine but data is old in production" bugs. Knowing how to granularly control cache behavior allows you to maximize performance while ensuring data integrity.

# Example Code

### Opting out of Data Cache

**TypeScript / JavaScript**
```javascript
// This will always fetch fresh data from the API
const res = await fetch('https://api.example.com/data', { 
  cache: 'no-store' 
});
```

### On-demand Revalidation

**TypeScript**
```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const tag = body.tag;
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true });
}
```

**JavaScript**
```javascript
// app/api/revalidate/route.js
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const tag = body.tag;
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true });
}
```

# Common Mistakes

- **Assuming `fetch` is always dynamic:** In Next.js, `fetch` is cached by default.
- **Confusion between `router.refresh()` and cache clearing:** `router.refresh()` clears the **Router Cache** and re-requests the page from the server, but if the **Data Cache** on the server is still stale, the user will still see old data.
- **Not using Tags for granular revalidation:** Relying only on `revalidatePath`, which can be too broad and purge more than intended.

# Follow-up Questions

- **What triggers a route to be "Dynamic"?** (Answer: Using dynamic functions like `cookies()`, `headers()`, `searchParams`, or opting out of caching in `fetch`).
- **Where is the Data Cache stored?** (Answer: It depends on the deployment platform. On Vercel, it's a global filesystem cache. In self-hosted Node.js, it's local to the filesystem).

# References

- [Next.js Documentation: Caching](https://nextjs.org/docs/app/building-your-application/caching)
