---
id: question.nextjs-server-actions
title: Next.js Server Actions
slug: nextjs-server-actions
difficulty: Hard
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-server-actions
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

Server Actions are a shift in how mutations are handled in React applications, moving away from explicit API endpoints. Interviewers want to know if you understand how they work, how they handle security (CSRF), and how they integrate with the Next.js caching layer.

## Key Concepts

- **The `'use server'` Directive:** Marking a file or function as a Server Action.
- **Form Actions:** Using the `action` attribute on HTML forms.
- **Progressive Enhancement:** How actions work before hydration.
- **`useFormStatus` and `useFormState`:** Hooks for managing action state in Client Components.
- **Revalidation:** Using `revalidatePath` and `revalidateTag` to update the UI after a mutation.
- **Security:** How Next.js protects Server Actions from unauthorized calls.

## Question Variations

- "How do Server Actions differ from traditional API routes?"
- "How do you handle error states and loading indicators with Server Actions?"
- "What is the purpose of `revalidatePath` inside a Server Action?"
- "Can you call a Server Action from a `useEffect`?"
