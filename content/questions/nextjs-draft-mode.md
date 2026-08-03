---
id: question.nextjs-draft-mode
title: Next.js Draft Mode (Preview)
slug: nextjs-draft-mode
difficulty: Hard
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-draft-mode
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

Static sites are great for speed but historically bad for content editors who need real-time previews. Next.js solves this with Draft Mode. Interviewers want to know if you can integrate a CMS effectively and understand how Next.js handles bypassing caches for specific sessions.

## Key Concepts

- **`draftMode()` function:** How to enable/disable it.
- **Cookies:** The mechanism used to track the draft session.
- **Cache Bypassing:** How `fetch` behavior changes when Draft Mode is active.
- **Security:** Using a secret token to prevent unauthorized access to Draft Mode.

## Question Variations

- "How do you implement a preview mode for a Headless CMS in Next.js?"
- "What happens to the Data Cache when Draft Mode is enabled?"
- "How does Next.js know to show draft content instead of the production version?"
- "Is Draft Mode available in the Pages Router?" (Answer: It was called Preview Mode there, but the concept is similar).
