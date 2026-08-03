---
id: variant.astro-component-syntax.astro
question: question.astro-component-syntax
technology: tech.astro
---
# Expected Answer

Astro components use a superset of HTML. The **frontmatter script** (top part) runs during the build (for static) or on the server (for SSR) and is stripped out before the page reaches the user.

```astro
---
// Component Script (Server-only)
const { title = "Default Title" } = Astro.props;
const data = await fetch('...').then(r => r.json());
---
<!-- Template (HTML/JSX) -->
<article>
  <h1>{title}</h1>
  <slot /> <!-- Children are injected here -->
</article>

<style>
  /* Scoped CSS */
  h1 { color: red; }
</style>
```

# Why It Matters

Because the frontmatter only runs on the server, you can perform sensitive operations like fetching data from a database using private API keys without worrying about leaking those keys to the client. The **Scoped CSS** feature is also high-signal; it uses unique data attributes to ensure styles don't conflict, similar to Vue's scoped styles.

# Common Mistakes

- **Assuming frontmatter runs in the browser**: Trying to use `window` or `document` inside the `---` fences will cause a "ReferenceError: window is not defined" because that code runs in a Node/Edge environment.
- **Mixing up Slots**: Forgetting that `<slot />` is for child elements and `{prop}` is for data. 
- **Global Styles**: Putting styles in a `<style>` tag and expecting them to affect other components. You must use `<style is:global>` for that.

# Follow-up Questions

- **Can you use TypeScript in the frontmatter?** (Answer: Yes, Astro has built-in support for TypeScript in every `.astro` file).
- **How do you handle conditional rendering?** (Answer: Using standard JavaScript logic like `{isLoggedIn && <Dashboard />}` or ternary operators).
