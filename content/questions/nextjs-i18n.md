---
id: question.nextjs-i18n
title: Internationalization (i18n)
slug: nextjs-i18n
difficulty: Hard
topic: topic.nextjs-fundamentals
concepts:
  - concept.nextjs-i18n
estimated_time: 15
updated: 2026-08-03
---

## Why This Is Asked

Building a multi-lingual site involves complex routing and data-fetching patterns. Interviewers want to know if you can architect a solution that is both SEO-friendly (localized URLs) and performant (pre-rendering translations).

## Key Concepts

- **Localized Routing:** `/en/about` vs `/fr/about`.
- **Locale Detection:** Using Middleware to read the `Accept-Language` header.
- **Translation Dictionaries:** How to load and use JSON translation files in Server Components.
- **`generateStaticParams` for locales:** Pre-rendering every page for every language.

## Question Variations

- "How would you implement multi-language support in a Next.js App Router project?"
- "What is the role of Middleware in internationalization?"
- "How do you handle translations in a Server Component?"
- "How does Next.js handle SEO for localized pages?"
