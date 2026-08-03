---
id: question.nextjs-error-handling
title: Error Handling & Not Found
slug: nextjs-error-handling
difficulty: Medium
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-error-handling
estimated_time: 10
updated: 2026-08-03
---

## Why This Is Asked

Gracefully handling errors and 404s is essential for a professional user experience. Interviewers want to see if you understand how to use Next.js's file-based conventions to isolate errors and provide clear feedback to the user.

## Key Concepts

- **Error Boundaries:** How `error.js` wraps its segment.
- **Recovering from Errors:** Using the `reset()` function provided to `error.js`.
- **Global Errors:** Catching errors in the root layout.
- **`notFound()`:** Manually triggering a 404 UI for invalid data (e.g., a non-existent product ID).

## Question Variations

- "How do you handle errors in the Next.js App Router?"
- "What is the purpose of the `error.js` file?"
- "How do you show a 404 page for a dynamic route when the data is missing?"
- "What is the difference between `error.js` and `global-error.js`?"
