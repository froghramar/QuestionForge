---
id: variant.koa-authentication-authorization.koa
question: question.koa-authentication-authorization
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Authentication middleware verifies credentials, then stores a minimal trusted principal in `ctx.state`. Authorization happens after authentication and evaluates that principal against the requested operation and resource. For bearer tokens, decoding is not verification: validate the signature, allowed algorithm, expiration, issuer, and audience before trusting claims. Use 401 for missing or invalid credentials and 403 for an authenticated principal that lacks permission.

Keep authentication reusable and make resource-level policies explicit near the route or domain service. Never use an identity or role passed by the client in the JSON body as proof of authorization.

# Why It Matters

This separation prevents broken access control and makes Koa middleware contracts clear.

# Code Example

```typescript
import Koa, { Context, Next } from 'koa';

type State = { user?: { id: string } };
const app = new Koa<State>();
app.use(async (ctx: Context<State>, next: Next) => {
  ctx.assert(ctx.get('authorization') === 'Bearer demo-token', 401, 'unauthorized');
  ctx.state.user = { id: 'u1' }; await next();
});
app.use((ctx: Context<State>) => { ctx.assert(ctx.state.user?.id === 'u1', 403); ctx.body = { ok: true }; });
app.listen(3000);
```

# Common Mistakes

- **Only decoding a JWT:** Unsigned or invalid claims can be forged.
- **Using a role check for every resource:** Ownership and tenant policy can still be violated.

# Follow-up Questions

- **Where should the principal live?** (Answer: `ctx.state`, scoped to this request.)
- **What does 403 mean?** (Answer: The caller is authenticated but forbidden.)
