---
id: concept.nextjs-i18n
title: Next.js Internationalization (i18n)
slug: nextjs-i18n
topic: topic.nextjs-fundamentals
description: Implementing multi-language support in the App Router using routing and middleware.
---
# Next.js Internationalization (i18n)

Next.js allows you to configure routing and rendering of content to support multiple languages.

### Routing Strategy
In the App Router, i18n is typically implemented using **dynamic route segments**. A common pattern is putting all routes inside a `[lang]` folder (e.g., `app/[lang]/page.tsx`).

### Key Components
- **Middleware:** Used to detect the user's preferred language (via the `Accept-Language` header or a cookie) and redirect them to the appropriate localized route.
- **Dictionaries:** JSON files containing translations for each language, which are loaded as needed in Server Components.
- **Static Generation:** Using `generateStaticParams` to pre-render all pages for all supported languages.
