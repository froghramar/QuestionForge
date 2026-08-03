---
id: variant.nextjs-app-vs-pages-router.nextjs
question: question.nextjs-app-vs-pages-router
technology: tech.nextjs
---

# Expected Answer

The primary difference lies in the **architecture and data fetching model**:

1.  **Pages Router (Legacy/Classic):** The original routing system based on standard React components that hydrate on the client. Data fetching happens at the page level using special functions like `getStaticProps` or `getServerSideProps`.
2.  **App Router (Next.js 13+):** The modern system built on **React Server Components (RSC)**. Components are server-first by default. They can fetch data directly using `async/await` and don't send their JavaScript to the client.

**Key Technical Differences:**
- **Layouts:** App Router supports nested layouts (folders) which don't re-render on navigation. Pages Router uses a single `_app.js` which is harder to optimize for nested UI.
- **Client/Server Boundary:** In the App Router, you must explicitly mark components that need interactivity or browser APIs with `'use client'`.
- **Bundle Size:** App Router significantly reduces the client-side JavaScript bundle because Server Components are not sent to the browser.
- **Streaming:** App Router supports streaming HTML in chunks (using Suspense), allowing parts of the page to load while others are still being generated.

# Why It Matters

The App Router is the future of Next.js. It enables better performance through smaller bundles and more granular control over rendering. However, it requires a mental shift in how you think about "where" your code runs (Server vs Client).

# Example Code

### Server Component (App Router)

**TypeScript**
```typescript
// app/users/page.tsx
export default async function UsersPage() {
  const users = await db.user.findMany(); // Direct DB access
  return (
    <ul>
      {users.map((user: any) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**JavaScript**
```javascript
// app/users/page.js
export default async function UsersPage() {
  const users = await db.user.findMany();
  return (
    <ul>
      {users.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

### Client Component (App Router)

**TypeScript**
```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**JavaScript**
```javascript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

# Common Mistakes

- **Adding `'use client'` everywhere:** This defeats the purpose of Server Components and increases bundle size.
- **Trying to use hooks in Server Components:** Things like `useState` or `useEffect` only work in Client Components.
- **Passing non-serializable data from Server to Client:** You can't pass functions or class instances across the server-client boundary.

# Follow-up Questions

- **Can a Server Component import a Client Component?** (Answer: Yes, this is the standard pattern).
- **Can a Client Component import a Server Component?** (Answer: No, not directly. But you can pass a Server Component as `children` or a prop to a Client Component).
- **How does the 'use client' directive affect child components?** (Answer: Everything imported into a file marked 'use client' is considered part of the client bundle).

# References

- [Next.js Documentation: App Router vs Pages Router](https://nextjs.org/docs/app/building-your-application/routinging#terminology)
- [React Documentation: Server Components](https://react.dev/reference/react/use-server)
