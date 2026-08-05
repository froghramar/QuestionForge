---
id: variant.custom-middleware.koa
question: question.custom-middleware
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa middleware receives `ctx` and `next`. It may enrich `ctx.state`, set a response, or use `await next()` to delegate and then perform upstream work. Register global policies such as error handling first, parsers before handlers that need bodies, and authorization before protected routes. Unlike a callback-only pipeline, Koa middleware naturally wraps downstream work.

# Why It Matters

Middleware order defines security, request parsing, and response behavior for the entire application.

# Code Example

```typescript
import crypto from 'node:crypto';
import Koa, { Context, Next } from 'koa';

const app = new Koa();
app.use(async (ctx: Context, next: Next) => {
  const requestId = crypto.randomUUID();
  ctx.set('X-Request-Id', requestId);
  await next();
});
app.use((ctx: Context) => { ctx.body = { ok: true }; });
app.listen(3000);
```

# Common Mistakes

- **Skipping `await next()` unintentionally:** Later middleware cannot run.
- **Registering authentication after a protected route:** The route can execute without its guard.

# Follow-up Questions

- **When does code after `await next()` run?** (Answer: When downstream middleware completes.)
- **Where should global errors be registered?** (Answer: First, so they wrap all downstream middleware.)
