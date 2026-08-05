---
id: variant.koa-response-handling.koa
question: question.koa-response-handling
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Use Koa’s context to build responses: set `ctx.status`, `ctx.body`, and headers rather than manually writing to Node’s raw response. Assigning an object or array to `ctx.body` serializes it as JSON. Koa defaults an untouched response to 404, which is why a route must set a body or explicit status. For a bodyless success, set the intended 204 status directly.

# Why It Matters

Koa’s response abstraction keeps status, headers, and body behavior consistent across middleware.

# Code Example

```typescript
import Koa, { Context } from 'koa';

const app = new Koa();
app.use((ctx: Context) => {
  if (ctx.path === '/deleted') { ctx.status = 204; return; }
  ctx.status = 200; ctx.body = { message: 'ok' };
});
app.listen(3000);
```

# Common Mistakes

- **Calling `ctx.res.end()` directly:** It bypasses Koa’s response handling.
- **Leaving a successful route without body or status:** Koa retains the default 404.

# Follow-up Questions

- **What body type produces JSON?** (Answer: An object or array.)
- **Why explicitly set 204?** (Answer: It communicates successful no-content semantics.)
