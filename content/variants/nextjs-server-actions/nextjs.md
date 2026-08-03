---
id: variant.nextjs-server-actions.nextjs
question: question.nextjs-server-actions
technology: tech.nextjs
---

# Expected Answer

Next.js Server Actions (stabilized in **Next.js 14**) are functions that run on the server but can be invoked directly from the client. They are defined with the `'use server'` directive at either the top of a file or the top of an `async` function.

**How they work:**
- When a Server Action is called, Next.js sends a POST request to the server.
- The server executes the function and returns the result (and any instructions to revalidate the cache).
- **Security:** They are protected against CSRF by default because they use a specialized POST request with a generated ID.

**Key Integration:**
Instead of `useEffect` -> `fetch('/api/...')` -> `setData(...)`, you simply call the action. With **React 18.2+ and React 19**, hooks like `useActionState` (React 19) or `useFormState` (React 18) are used to handle the response and loading states. If you use `revalidatePath('/some-page')` inside the action, Next.js will automatically update the data on that page for the user.

# Why It Matters

Server Actions simplify the data mutation flow. They enable **Progressive Enhancement**, meaning forms can work even if JavaScript is disabled or still loading. They also provide a much tighter developer experience (DX) with full type safety across the network boundary.

# Example Code

### Basic Server Action

**TypeScript**
```typescript
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;
  await db.todo.create({ data: { title } });
  
  revalidatePath('/todos');
}
```

**JavaScript**
```javascript
// app/actions.js
'use server'

import { revalidatePath } from 'next/cache'

export async function createTodo(formData) {
  const title = formData.get('title');
  await db.todo.create({ data: { title } });
  
  revalidatePath('/todos');
}
```

### Usage in a Form

**TypeScript**
```typescript
// app/todos/page.tsx
import { createTodo } from '@/app/actions';

export default function Page() {
  return (
    <form action={createTodo}>
      <input type="text" name="title" required />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

**JavaScript**
```javascript
// app/todos/page.js
import { createTodo } from '@/app/actions';

export default function Page() {
  return (
    <form action={createTodo}>
      <input type="text" name="title" required />
      <button type="submit">Add Todo</button>
    </form>
  );
}
```

# Common Mistakes

- **Not handling errors:** Server Actions can fail. You should use `try/catch` or hooks like `useFormState` to display errors to the user.
- **Putting sensitive logic in the client:** Even though the function is called from the client, the logic *must* remain on the server. Don't forget to authorize the user inside the action.
- **Forgetting revalidation:** If you mutate data but don't call `revalidatePath` or `revalidateTag`, the UI will show stale data until a hard refresh.

# Follow-up Questions

- **What is the `useFormStatus` hook used for?** (Answer: It provides the `pending` state of a parent form, allowing you to show a loading spinner or disable the submit button).
- **How do you pass extra arguments to a Server Action?** (Answer: You can use `.bind(null, arg1, arg2)` or a wrapper function).
- **Are Server Actions always POST requests?** (Answer: Yes, they are invoked via a POST request under the hood).

# References

- [Next.js Documentation: Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React Documentation: useActionState (formerly useFormState)](https://react.dev/reference/react/useActionState)
