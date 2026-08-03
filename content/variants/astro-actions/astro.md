---
id: variant.astro-actions.astro
question: question.astro-actions
technology: tech.astro
---
# Expected Answer

**Astro Actions** are type-safe server functions defined in `src/actions/index.ts`. They use Zod to validate input and can be called from both the server and the client.

```typescript
// src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  subscribe: defineAction({
    input: z.object({
      email: z.string().email(),
    }),
    handler: async (input) => {
      await db.saveEmail(input.email);
      return { success: true };
    }
  })
}
```

Usage in an Astro Component (Progressive Enhancement):
```astro
---
import { actions } from 'astro:actions';
const result = Astro.getActionResult(actions.subscribe);
---
<form method="POST" action={actions.subscribe}>
  <input type="email" name="email" required />
  <button>Subscribe</button>
  {result?.data?.success && <p>Thanks for joining!</p>}
</form>
```

# Why It Matters

Actions bridge the gap between frontend and backend with **full type safety**. If you change the input schema in your action, TypeScript will immediately flag errors in your components. They also support **Progressive Enhancement**, meaning forms will still submit and work even if the user's browser hasn't loaded JavaScript yet.

# Common Mistakes

- **Not using `Astro.getActionResult()`**: On the server, you need this to read the result of a POST request after the page reloads.
- **Client-only logic in handlers**: Handlers run exclusively on the server (or in a serverless function). You cannot access browser APIs like `localStorage` inside an action handler.
- **Over-relying on JSON**: While calling actions via `actions.subscribe(data)` in JS is convenient, using the `action` attribute on a `<form>` is more resilient.

# Follow-up Questions

- **How do you handle authentication inside an action?** (Answer: You can access `context.locals` inside the handler function to check for a user session).
- **Can actions be used with React components?** (Answer: Yes, you can import and call `actions.yourAction()` just like a standard async function).
