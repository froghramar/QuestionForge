---
id: variant.nextjs-draft-mode.nextjs
question: question.nextjs-draft-mode
technology: tech.nextjs
---

# Expected Answer

Next.js **Draft Mode** allows you to bypass the static cache for specific users (like content editors).

**Workflow:**
1.  **Secret Token:** You define a secret token shared between your Next.js app and your CMS.
2.  **Route Handler:** You create a route (e.g., `/api/draft`) that validates the secret token and a `slug` from the CMS.
3.  **Enable:** If valid, the handler calls `draftMode().enable()`. This sets a `__prerender_bypass` cookie.
4.  **Dynamic Rendering:** When this cookie is present, all subsequent requests for that user session will bypass the Data Cache and Full Route Cache.
5.  **Redirect:** The user is redirected to the actual page (e.g., `/blog/my-post`), which now shows the latest draft data from the CMS.

# Why It Matters

Draft Mode provides the best of both worlds: static performance for the public and dynamic, real-time updates for editors. It's a key selling point for using Next.js with modern Headless CMSs like Sanity, Contentful, or Strapi.

# Example Code

### Enabling Draft Mode

**TypeScript**
```typescript
// app/api/draft/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.DRAFT_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  draftMode().enable();
  redirect(`/posts/${slug}`);
}
```

**JavaScript**
```javascript
// app/api/draft/route.js
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.DRAFT_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  draftMode().enable();
  redirect(`/posts/${slug}`);
}
```

### Checking in a Page
```typescript
// app/posts/[slug]/page.tsx
import { draftMode } from 'next/headers';

export default async function Page({ params }) {
  const { isEnabled } = draftMode();
  
  // Use a different API endpoint or flag if draft mode is enabled
  const data = await getPost(params.slug, isEnabled);

  return <div>{isEnabled ? 'PREVIEW MODE' : ''} ...</div>;
}
```

# Common Mistakes

- **Not securing the endpoint:** If you don't use a secret token, anyone can enable draft mode and potentially put extra load on your CMS or view unreleased content.
- **Forgetting to disable:** Not providing a way to turn off draft mode can be confusing for editors who want to see the live site again.
- **CSR vs SSR:** Thinking draft mode only works on the client. It is a server-side feature that affects how Server Components fetch data.

# Follow-up Questions

- **Can you see which user enabled draft mode?** (Answer: No, Next.js only knows *that* it is enabled via the cookie, not *who* enabled it).
- **Does draft mode work with ISR?** (Answer: Yes. When draft mode is on, the ISR cache is bypassed).

# References

- [Next.js Documentation: Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode)
