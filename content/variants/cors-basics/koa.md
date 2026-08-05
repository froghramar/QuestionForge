---
id: variant.cors-basics.koa
question: question.cors-basics
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

CORS is enforced by browsers through HTTP response headers. A Koa API should allow only known origins, methods, and headers needed by its browser clients. Credentialed requests require an explicit allowed origin and credentials header; `*` cannot be used for that case. Preflight `OPTIONS` requests must be handled for non-simple browser requests.

CORS is not authentication or authorization. Non-browser callers do not enforce it, so protected Koa routes still need server-side identity and permission checks.

# Why It Matters

Tight CORS settings prevent unintended browser access, while correct preflight support prevents legitimate clients from failing before the route executes.

# Code Example

```typescript
import Koa, { Context, Next } from 'koa';

const app = new Koa();
app.use(async (ctx: Context, next: Next) => {
  if (ctx.get('origin') === 'https://app.example.com') ctx.set('Access-Control-Allow-Origin', 'https://app.example.com');
  if (ctx.method === 'OPTIONS') { ctx.status = 204; return; }
  await next();
});
app.use((ctx: Context) => { ctx.body = { ok: true }; });
app.listen(3000);
```

# Common Mistakes

- **Treating CORS as access control:** It does not stop direct API calls.
- **Using wildcard origins for cookie requests:** Browsers disallow that credentialed configuration.

# Follow-up Questions

- **What triggers a preflight?** (Answer: Non-simple methods, headers, or content types.)
- **Should CORS replace CSRF defenses?** (Answer: No; they address different threats.)
