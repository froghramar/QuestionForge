---
id: variant.nextjs-i18n.nextjs
question: question.nextjs-i18n
technology: tech.nextjs
---

# Expected Answer

In the App Router, internationalization is achieved through a combination of **Middleware** and **Dynamic Segments**.

1.  **Routing:** You wrap your entire application structure in a `[lang]` folder (e.g., `app/[lang]/layout.tsx`). This ensures every URL includes the locale.
2.  **Detection:** You use `middleware.ts` to check the user's `Accept-Language` header or a specific cookie. If the user visits `/` without a locale, the middleware redirects them to the best-matched locale (e.g., `/en`).
3.  **Translations:** Instead of a complex library, you can use simple "dictionaries" (JSON files). Since Server Components support `async/await`, you can fetch the correct JSON file based on the `lang` param.

# Why It Matters

Implementing i18n via routing is the best practice for SEO because it gives search engines a unique URL for each version of the content. Using Server Components for translations keeps the client-side bundle small, as the translation logic and dictionaries stay on the server.

# Example Code

### Loading a Dictionary

**TypeScript**
```typescript
// app/[lang]/dictionaries.ts
const dictionaries: any = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'fr') => dictionaries[locale]()
```

**JavaScript**
```javascript
// app/[lang]/dictionaries.js
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
}

export const getDictionary = async (locale) => dictionaries[locale]()
```

### Using in a Page

**TypeScript**
```typescript
// app/[lang]/page.tsx
import { getDictionary } from './dictionaries'

export default async function Page({ params: { lang } }: { params: { lang: 'en' | 'fr' } }) {
  const dict = await getDictionary(lang)
  return <button>{dict.products.cart}</button>
}
```

**JavaScript**
```javascript
// app/[lang]/page.js
import { getDictionary } from './dictionaries'

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return <button>{dict.products.cart}</button>
}
```

# Common Mistakes

- **Using client-side context for translations:** This is unnecessary in the App Router and prevents you from benefiting from Server Components.
- **Forgetting SEO tags:** You should still use the Metadata API to set `alternates` with `languages` to tell search engines about the different versions of the page.
- **Hard-coding the locale:** Not using the `[lang]` segment makes it much harder to handle deep links and search engine indexing.

# Follow-up Questions

- **How do you handle RTL (Right-to-Left) languages?** (Answer: You can set the `dir` attribute on the `<html>` tag in the root layout based on the `lang` parameter).
- **Can you use `next-intl` or `i18next` with the App Router?** (Answer: Yes, these libraries have been updated to support the App Router, providing more advanced features like pluralization and date formatting).

# References

- [Next.js Documentation: Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
