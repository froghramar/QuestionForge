---
id: question.nextjs-forms-validation
title: Forms & Validation (Server Actions + Zod)
slug: nextjs-forms-validation
difficulty: Medium
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-forms-validation
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

Building robust forms is a daily task for most developers. Next.js has changed the pattern from "Client-side `onSubmit` + `fetch`" to "Server Actions + Hooks." Interviewers want to see if you can implement a form that handles validation errors gracefully, provides loading states, and supports progressive enhancement.

## Key Concepts

- **`useActionState`:** Managing server-returned state.
- **`useFormStatus`:** Accessing the `pending` state in child components.
- **Server-side Validation:** Why validating in the action is non-negotiable.
- **Client-side Validation:** Enhancing the UX with immediate feedback.
- **Schema Validation (Zod):** How to integrate Zod with `FormData`.

## Question Variations

- "How do you handle form validation in the Next.js App Router?"
- "What is the benefit of `useActionState` over traditional state management?"
- "How do you display loading indicators for a Server Action?"
- "How do you use Zod to validate form data in a Server Action?"
