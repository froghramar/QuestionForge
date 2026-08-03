---
id: question.astro-security-env
title: Security & Environment Variables
slug: astro-security-env
difficulty: Medium
topic: topic.astro-fundamentals
concepts:
  - concept.astro-env-vars
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked
Security is paramount in modern web development. Interviewers ask this to ensure you understand the difference between server-side and client-side secrets and how to prevent sensitive data from reaching the browser.

## Key Concepts
- **`import.meta.env`**: How to access variables in Astro.
- **`PUBLIC_` Prefix**: The gatekeeper for client-side visibility.
- **`astro:env`**: Defining schemas for environment variables.
- **Build vs Runtime**: When are environment variables injected?

## Question Variations
- "How do you prevent a database password from being bundled into your client-side JavaScript?"
- "What is the `astro:env` module and why is it useful?"
- "How do you handle environment variables in a serverless deployment (e.g., Vercel or Netlify)?"
- "Can you access non-prefixed variables in a React component used as an Island?"
