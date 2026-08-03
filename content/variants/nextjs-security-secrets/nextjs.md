---
id: variant.nextjs-security-secrets.nextjs
question: question.nextjs-security-secrets
technology: tech.nextjs
---

# Expected Answer

Next.js manages security through strict environment variable handling and architectural boundaries:

1.  **Environment Variables:** Variables are private by default. Only those prefixed with `NEXT_PUBLIC_` are accessible in the browser.
2.  **`server-only` Package:** You should use the `server-only` package in modules that contain sensitive logic (like DB queries or API keys). If a Client Component tries to import a `server-only` module, Next.js will throw a build-time error.
3.  **Manual Sanitization:** When passing data from a Server Component to a Client Component, you must manually "pluck" the needed fields. If you pass a whole `user` object from the database, you might accidentally include a hashed password.
4.  **Taint API:** For advanced protection, the Taint API (experimental) can programmatically block specific objects from crossing the server-client boundary.

# Why It Matters

Data leaks are one of the most common security vulnerabilities in modern web apps. Because Next.js makes it so easy to fetch data on the server, it's equally easy to forget which data is safe for the client and which isn't.

# Example Code

### Using `server-only`

**TypeScript / JavaScript**
```javascript
// lib/db.js
import 'server-only';

export const db = new DatabaseClient(process.env.DB_SECRET);
```

### Safe Prop Passing

**TypeScript**
```typescript
// app/page.tsx
export default async function Page() {
  const user = await db.user.findFirst();

  return (
    <ClientComponent 
      user={{ name: user.name, email: user.email }} 
    />
  );
}
```

**JavaScript**
```javascript
// app/page.js
export default async function Page() {
  const user = await db.user.findFirst();

  return (
    <ClientComponent 
      user={{ name: user.name, email: user.email }} 
    />
  );
}
```

# Common Mistakes

- **Prefixing everything with `NEXT_PUBLIC_`:** Doing this for "convenience" is a massive security risk.
- **Relying on TypeScript for security:** Types are erased at runtime; just because a field isn't in a TS interface doesn't mean it isn't in the JavaScript object being sent to the browser.
- **Forgetting Authorization in Server Actions:** Thinking that because the action is on the server, it is "safe." Anyone can call a Server Action's POST endpoint if they know the ID.

# Follow-up Questions

- **Where do environment variables come from in production?** (Answer: They are usually injected by the CI/CD pipeline or the hosting provider, like Vercel's Environment Variables settings).
- **Can you hide a `NEXT_PUBLIC_` variable from the user?** (Answer: No. If it has that prefix, it is part of the client-side JavaScript bundle and can be read by anyone).

# References

- [Next.js Documentation: Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Next.js Documentation: Security Best Practices](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#security)
