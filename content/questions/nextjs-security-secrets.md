---
id: question.nextjs-security-secrets
title: Security & Secrets in Next.js
slug: nextjs-security-secrets
difficulty: Hard
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-security
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

With React Server Components, the boundary between server and client is more transparent. This increases the risk of accidentally sending a database secret or an API key to the browser. Interviewers want to know if you understand how to keep secrets on the server and how Next.js helps prevent data leaks.

## Key Concepts

- **`NEXT_PUBLIC_` Prefix:** Its purpose and risks.
- **Server-only Code:** Using the `server-only` package to prevent server-side code from being imported into Client Components.
- **Action Authorization:** Why Server Actions need manual permission checks.
- **Data Leaks:** Accidental exposure of private database fields in RSC props.

## Question Variations

- "How do you ensure an API key is never leaked to the client in Next.js?"
- "What is the `server-only` package and why should you use it?"
- "How do you handle sensitive user data when passing props from a Server Component to a Client Component?"
- "Are environment variables in `.env` secure?"
