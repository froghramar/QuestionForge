---
id: variant.global-exception-handling.koa
question: question.global-exception-handling
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa centralizes request errors in outer middleware: `try { await next(); } catch (error) { ... }`. It must be registered first so it wraps routes, routers, and later middleware. Map known safe failures to a stable response, log the actual exception and request context, and return a generic 500 for unexpected errors. Use `ctx.throw()` for expected HTTP failures rather than manually creating inconsistent response bodies.

# Why It Matters

Centralization stops sensitive errors escaping and gives every API endpoint the same failure contract.

# Code Example

```typescript
import Koa, { Context, Next } from 'koa';

const app = new Koa();
app.use(async (ctx: Context, next: Next) => {
  try { await next(); }
  catch (error) { ctx.status = (error as { status?: number }).status ?? 500; ctx.body = { error: 'request failed' }; }
});
app.use((ctx: Context) => { ctx.throw(403, 'forbidden'); });
app.listen(3000);
```

# Common Mistakes

- **Adding the error boundary last:** It does not wrap preceding failures.
- **Sending exception details to clients:** Stack traces and service details can leak.

# Follow-up Questions

- **What does `ctx.throw(400)` do?** (Answer: Throws an HTTP-aware error that outer middleware can map.)
- **What is Koa’s error event for?** (Answer: App-level logging and observability.)
