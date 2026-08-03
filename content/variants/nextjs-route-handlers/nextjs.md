---
id: variant.nextjs-route-handlers.nextjs
question: question.nextjs-route-handlers
technology: tech.nextjs
---

# Expected Answer

Route Handlers are the modern way to build APIs in Next.js. They are defined in `route.ts` files and use the standard Web `Request` and `Response` APIs.

**Key Differences from Pages Router:**
- **Standard APIs:** Instead of `(req, res)` from Node.js, you use `export async function GET(request: Request)`.
- **HTTP Method Exports:** You export specific functions named after the HTTP method (`GET`, `POST`, etc.) rather than a single default handler with a `switch` statement.
- **Caching:** `GET` handlers are cached by default at build time unless they use dynamic functions (like `cookies()` or `headers()`) or use the `Request` object.

# Why It Matters

Using standard Web APIs makes your code more portable and easier to test. Understanding the caching behavior is critical to avoid serving stale data from an API meant to be dynamic.

# Example Code

### Dynamic POST Handler

**TypeScript**
```typescript
// app/api/items/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  // Logic to save data to DB
  return NextResponse.json({ success: true, id: 123 }, { status: 201 });
}
```

**JavaScript**
```javascript
// app/api/items/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.json();
  // Logic to save data to DB
  return NextResponse.json({ success: true, id: 123 }, { status: 201 });
}
```

### Accessing Params

**TypeScript**
```typescript
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  return Response.json({ id, name: 'John Doe' });
}
```

**JavaScript**
```javascript
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const id = params.id;
  return Response.json({ id, name: 'John Doe' });
}
```

# Common Mistakes

- **Forgetting `await request.json()`:** The request body is a stream and must be awaited.
- **Trying to use `route.ts` and `page.ts` in the same directory:** This will cause a build error because the route is ambiguous.
- **Unintentional Caching:** Being surprised when a `GET` request returns the same data because it was statically optimized at build time.

# Follow-up Questions

- **How do you opt-out of caching for a GET handler?** (Answer: You can use `export const dynamic = 'force-dynamic'`, or use a dynamic function like `cookies()`).
- **Can Route Handlers be used with the Edge Runtime?** (Answer: Yes, by setting `export const runtime = 'edge'`).

# References

- [Next.js Documentation: Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
