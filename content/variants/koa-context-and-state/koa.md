---
id: variant.koa-context-and-state.koa
question: question.koa-context-and-state
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa creates one `Context` per request. It combines convenient request and response accessors, so a handler reads values such as `ctx.path` or `ctx.query` and sets `ctx.status`, `ctx.body`, and headers. Use `ctx.state` for request-scoped data shared between middleware, such as an authenticated principal, correlation ID, or validated input. It is isolated to that request, unlike a module-level mutable variable that can leak across concurrent requests.

Avoid writing directly to the underlying Node `ctx.req` and `ctx.res` objects because it bypasses Koa’s response lifecycle. If TypeScript state needs extension, parameterize `Context` with a state interface so later middleware cannot assume fields exist without the authentication middleware.

# Why It Matters

Request-scoped state makes middleware composable without cross-request data leakage.

# Code Example

```typescript
import crypto from 'node:crypto';
import Koa, { Context, Next } from 'koa';

type State = { requestId?: string };
const app = new Koa<State>();
app.use(async (ctx: Context<State>, next: Next) => {
  ctx.state.requestId = crypto.randomUUID();
  await next();
});
app.use((ctx: Context<State>) => { ctx.body = { requestId: ctx.state.requestId }; });
app.listen(3000);
```

# Common Mistakes

- **Using a global `currentUser` variable:** Concurrent requests can overwrite each other’s identity.
- **Writing raw `ctx.res` methods:** Koa may no longer manage headers and body correctly.

# Follow-up Questions

- **What belongs in `ctx.state`?** (Answer: Data scoped to this request that later middleware needs.)
- **Why type the state interface?** (Answer: It documents middleware contracts and catches invalid assumptions.)
