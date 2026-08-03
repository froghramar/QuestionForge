---
id: variant.nextjs-auth-patterns.nextjs
question: question.nextjs-auth-patterns
technology: tech.nextjs
---

# Expected Answer

Authentication in the App Router is **server-first**. The standard pattern involves:

1.  **Storage:** Use HTTP-only, secure cookies to store the session or JWT. This allows the server to read the auth state during the initial request.
2.  **Protection (Global):** Use **Middleware** to check for the cookie. If missing on a protected route (like `/dashboard`), redirect to `/login`. This is efficient as it happens before any page rendering.
3.  **Protection (Granular):** In **Server Components**, you can call `cookies()` or a helper like `auth()` from Auth.js to get the user's details and render personalized content.
4.  **Client-side:** For interactive parts, wrap your layout in a `SessionProvider` (if using Auth.js) to access the session via `useSession()`.

# Why It Matters

Moving auth to the server prevents "layout shift" where a guest UI flashes before the user is redirected. It also improves security by keeping sensitive tokens out of reach of client-side JavaScript (XSS protection).

# Example Code

### Middleware Protection

**TypeScript**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

**JavaScript**
```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('session');
  
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### Server Component Auth
```typescript
// app/dashboard/page.tsx
import { auth } from '@/auth'; // Assuming Auth.js

export default async function Page() {
  const session = await auth();
  
  if (!session) return <div>Access Denied</div>;

  return <h1>Welcome, {session.user.name}</h1>;
}
```

# Common Mistakes

- **Relying ONLY on Middleware:** Middleware is for routing. Sensitive data fetching in pages or actions should *always* re-verify the session.
- **Using `localStorage` for tokens:** This makes your Server Components unusable for authenticated content, as they can't access `localStorage`.
- **Not using HTTPS-only cookies:** Leaving your auth tokens vulnerable to theft via malicious scripts.

# Follow-up Questions

- **How do you handle Token Refresh?** (Answer: This can be done in Middleware or a Route Handler by checking the expiration and calling the Auth provider's refresh endpoint).
- **Can you use Third-party Auth (like Supabase or Firebase) with Next.js?** (Answer: Yes, they provide their own helper libraries that integrate with Next.js cookies and middleware).

# References

- [Next.js Documentation: Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [Auth.js (NextAuth.js) Documentation](https://authjs.dev/)
