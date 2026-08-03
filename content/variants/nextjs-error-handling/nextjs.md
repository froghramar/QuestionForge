---
id: variant.nextjs-error-handling.nextjs
question: question.nextjs-error-handling
technology: tech.nextjs
---

# Expected Answer

Next.js uses a convention-based approach to error handling:

1.  **`error.js`**: By creating this file, you define a React Error Boundary for a route segment. If any component in that segment throws an error, the UI in `error.js` is shown instead. It receives an `error` object and a `reset` function to attempt recovery.
2.  **`notFound()`**: This is a function you can call in a Server Component when data isn't found (e.g., after a database query returns null). It triggers the nearest `not-found.js` file.
3.  **`global-error.js`**: Since `error.js` doesn't catch errors in its own layout, `global-error.js` is used to catch errors at the very top of the application, including the root layout.

# Why It Matters

Proper error handling prevents the entire application from crashing due to a single component failure. It allows you to provide a "Try Again" button or a helpful 404 page, which is critical for user retention.

# Example Code

### Basic `error.js`

**TypeScript**
```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

**JavaScript**
```javascript
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Triggering a 404

**TypeScript**
```typescript
// app/users/[id]/page.tsx
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id);
  if (!user) notFound();
  return <div>{user.name}</div>;
}
```

**JavaScript**
```javascript
// app/users/[id]/page.js
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const user = await fetchUser(params.id);
  if (!user) notFound();
  return <div>{user.name}</div>;
}
```

# Common Mistakes

- **Not making `error.js` a Client Component:** It must be a Client Component because it needs to catch errors from the server and provide interactive recovery.
- **Forgetting `global-error.js`:** Without it, an error in the root layout will result in a generic browser error screen.
- **Not logging errors:** While displaying a fallback UI is good, you should still use the `useEffect` hook inside `error.js` to log the error to a service like Sentry.

# Follow-up Questions

- **Does `error.js` catch errors in its parent layout?** (Answer: No, it only catches errors in its own segment and children. To catch errors in the layout, the `error.js` must be in the parent directory).
- **Can you customize the default 404 page for the whole app?** (Answer: Yes, by creating a `not-found.js` file in the `app/` root directory).

# References

- [Next.js Documentation: Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Next.js API Reference: notFound](https://nextjs.org/docs/app/api-reference/functions/not-found)
