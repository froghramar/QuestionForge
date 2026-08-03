---
id: variant.astro-middleware.astro
question: question.astro-middleware
technology: tech.astro
---
# Expected Answer

Astro Middleware is defined in a `src/middleware.ts` (or `.js`) file. It exports an `onRequest` function that receives a `context` object and a `next` function.

```typescript
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Intercept Request (e.g., Auth check)
  const session = context.cookies.get("session");
  
  if (!session && context.url.pathname.startsWith("/dashboard")) {
    return context.redirect("/login");
  }

  // 2. Inject Data into Locals
  context.locals.user = session ? await getUser(session.value) : null;

  // 3. Call next() to continue
  const response = await next();

  // 4. Modify Response (e.g., Security Headers)
  response.headers.set("X-Custom-Header", "Astro-Powered");
  
  return response;
});
```

# Why It Matters

Middleware is essential for **Server-Side Rendering (SSR)**. It allows you to centralize logic that would otherwise be duplicated across many page components. By using `context.locals`, you can pass typed information (like the current user) down to every `.astro` component and API route in the tree.

# Common Mistakes

- **Forgetting to return the result of `next()`**: This will result in a blank response or a timeout.
- **Heavy computations in Middleware**: Since middleware runs on every single request, putting slow database queries here can significantly degrade the Time to First Byte (TTFB) for the entire site.
- **Assuming it runs on Static Assets**: Middleware in Astro only runs for routes handled by the Astro engine, not for static files in the `public/` folder.

# Follow-up Questions

- **How do you use multiple middleware functions?** (Answer: Use the `sequence()` utility from `astro:middleware`).
- **Can middleware be used to rewrite URLs?** (Answer: No, Astro middleware does not currently support URL rewriting, only redirects and response modification).
