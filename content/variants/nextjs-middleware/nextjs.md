---
id: variant.nextjs-middleware.nextjs
question: question.nextjs-middleware
technology: tech.nextjs
---

# Expected Answer

Next.js Middleware is code that runs **before a request is completed** on the server. It allows you to intercept the request and perform logic like authentication, redirects, or header manipulation.

**Key Implementation Details:**
- **Placement:** It must be defined in a `middleware.ts` (or `.js`) file in the root of your project (or `src/`).
- **Runtime:** It runs in the **Edge Runtime**, which supports a subset of Node.js APIs to ensure low latency. It does not support heavy Node.js libraries or file system access.
- **Execution Flow:** It runs before any cached content and before any routes are matched.

# Why It Matters

Middleware is essential for security and performance. Instead of checking authentication in every single page or API route, you can do it once in Middleware. Because it runs at the Edge, it can respond or redirect significantly faster than a traditional server.

# Example Code

### Basic Authentication & Redirect

**TypeScript**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

**JavaScript**
```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

# Common Mistakes

- **Using heavy libraries:** Trying to use large NPM packages that aren't compatible with the Edge Runtime (e.g., `bcrypt`, full DB drivers).
- **Infinite Loops:** Redirecting to a path that is also caught by the same middleware without proper checks.
- **Complexity:** Putting too much business logic in Middleware, which can slow down every request to the site.

# Follow-up Questions

- **What is the difference between a rewrite and a redirect?** (Answer: A **redirect** changes the URL in the browser and returns a 3xx status code. A **rewrite** maps the source URL to a destination URL internally, so the browser URL stays the same).
- **Can you access the database in Middleware?** (Answer: Generally no, unless using an Edge-compatible client like Prisma with Accelerate or a HTTP-based DB API like Supabase/Neon).

# References

- [Next.js Documentation: Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Next.js Documentation: Edge Runtime](https://nextjs.org/docs/app/api-reference/edge)
