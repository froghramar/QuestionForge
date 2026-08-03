---
id: variant.astro-security-env.astro
question: question.astro-security-env
technology: tech.astro
---
# Expected Answer

Astro uses a prefix-based system for environment variables. By default, variables in `.env` are private.

- **Private**: `API_KEY=secret` -> Accessible via `import.meta.env.API_KEY` only in server-side code (frontmatter, middleware, actions).
- **Public**: `PUBLIC_API_URL=https://api.com` -> Accessible via `import.meta.env.PUBLIC_API_URL` on both server and client.

For better safety, you should use the **`astro:env`** module (introduced in Astro 4.x) to define a schema in `astro.config.mjs`:

```javascript
// astro.config.mjs
export default defineConfig({
  env: {
    schema: {
      API_KEY: envField.string({ context: 'server', access: 'secret' }),
      PUBLIC_URL: envField.string({ context: 'client', access: 'public' }),
    }
  }
});
```
Then, import them from `astro:env/server` or `astro:env/client` for full type safety and validation.

# Why It Matters

Leaking a secret key (like a Stripe private key) to the browser is a catastrophic security failure. Astro's default behavior of stripping non-prefixed variables from the client bundle provides a safety net, but using the explicit `astro:env` schema ensures that your application won't even start if a required variable is missing or malformed.

# Common Mistakes

- **Forgetting the `PUBLIC_` prefix**: Trying to use a variable in a client-side `<script>` or a React Island and wondering why it's `undefined`.
- **Hardcoding secrets in code**: Even if not prefixed, committing a secret to Git is a security risk. Always use `.env` files and add them to `.gitignore`.
- **Mixing contexts**: Importing a `server` variable into a `client` file will cause a build-time error in recent Astro versions.

# Follow-up Questions

- **How do you handle secrets in a static (SSG) build?** (Answer: They are injected at build time. If the secret changes, you must rebuild and redeploy the site).
- **What is the difference between `access: 'secret'` and `access: 'public'`?** (Answer: `secret` variables are never sent to the client; `public` variables are included in the JS bundle).
---
