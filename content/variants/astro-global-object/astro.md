---
id: variant.astro-global-object.astro
question: question.astro-global-object
technology: tech.astro
---
# Expected Answer

The `Astro` global provides a wide range of utilities for the current request.

**Reading Search Params:**
```javascript
const search = Astro.url.searchParams.get('q');
```

**Handling Cookies:**
```javascript
const userSession = Astro.cookies.get('session')?.value;
Astro.cookies.set('theme', 'dark', { path: '/' });
```

**Redirecting:**
```javascript
if (!userSession) {
  return Astro.redirect('/login');
}
```

# Why It Matters

The `Astro` global is the "Connective Tissue" of your application. It allows you to build dynamic, context-aware pages. Because it follows standard Web APIs (like `Request` and `URL`), it makes the framework feel consistent with modern web development standards.

# Common Mistakes

- **Mutating `Astro.props`**: Props should be treated as read-only.
- **Using `Astro.cookies` in Static mode**: This will work during development but will return empty/default values during a static build since there is no visitor cookie at build time.
- **Redirecting too late**: `Astro.redirect` must be returned or called before any HTML is sent. In the frontmatter, it effectively acts as a short-circuit for the rest of the component.

# Follow-up Questions

- **What is the difference between `Astro.url` and `Astro.request.url`?** (Answer: `Astro.url` is a convenient `URL` object helper, while `Astro.request.url` is the raw string from the Request object).
- **How do you get the client's IP address?** (Answer: In SSR mode, it's often available via `Astro.clientAddress`, depending on your adapter).
---
