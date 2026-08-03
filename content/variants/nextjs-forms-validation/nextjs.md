---
id: variant.nextjs-forms-validation.nextjs
question: question.nextjs-forms-validation
technology: tech.nextjs
---

# Expected Answer

The modern Next.js pattern for forms (introduced in **Next.js 14**) involves three main parts: **Server Actions**, **Zod for validation**, and **React hooks for state**.

1.  **Validation:** In your Server Action, you parse the `FormData` using a Zod schema. This ensures the data is correct before touching your database.
2.  **State Management:** You use `useActionState` (**React 19**) or `useFormState` (**React 18**) to hook into the action. It takes the action and an initial state, returning the current state (often containing validation errors) and a wrapped action to pass to the `<form>`.
3.  **UI Feedback:** You use `useFormStatus` (introduced in **React 18**) to detect when the form is `pending`.

**Progressive Enhancement:** Because the form uses the `action` attribute, it will still submit and function even if the user's browser hasn't downloaded the JavaScript bundle yet.

# Why It Matters

This pattern reduces the amount of client-side JavaScript needed and makes the connection between the UI and the backend logic more direct. It handles "loading" and "error" states out of the box without requiring multiple `useState` and `useEffect` calls.

# Example Code

### The Server Action (with Zod)
```typescript
// app/actions.ts
'use server'
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  // Save to DB...
  return { message: 'Success!' };
}
```

### The Component
```typescript
'use client'
import { useActionState } from 'react';
import { signUp } from './actions';

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, null);

  return (
    <form action={formAction}>
      <input type="email" name="email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Submitting...' : 'Sign Up'}</button>;
}
```

# Common Mistakes

- **Not validating on the server:** Thinking client-side HTML validation is enough.
- **Forgetting `prevState`:** `useActionState` requires the action function to accept `prevState` as the first argument.
- **Putting `useFormStatus` in the same component as `<form>`:** It only works in components that are **children** of the `<form>`.

# Follow-up Questions

- **How do you handle multiple forms on one page?** (Answer: Each form can have its own `useActionState` hook).
- **Can you use this with library like React Hook Form?** (Answer: Yes, you can manually call the Server Action inside the `onSubmit` handler, but you lose the Progressive Enhancement benefit).

# References

- [Next.js Documentation: Forms and Validation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms)
- [React Documentation: useActionState](https://react.dev/reference/react/useActionState)
