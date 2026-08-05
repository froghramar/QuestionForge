---
id: variant.koa-error-handling.koa
question: question.koa-error-handling
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Place a single error boundary first in the Koa middleware stack. It wraps `await next()` in `try`/`catch`, so it sees exceptions and rejected promises from all downstream middleware. For expected request failures, use `ctx.throw(status, message)` or throw a structured error; the boundary should log the original failure, map known operational errors to a safe response, and return a generic 500 for unknown failures.

Koa emits an application `error` event for logging, but that event does not replace a response policy. Do not expose stack traces, database messages, or tokens in client responses. Ensure error middleware only writes a response when headers have not already been sent, and preserve an error ID in logs for diagnosis.

# Why It Matters

A predictable error boundary protects sensitive details and makes every API route return consistent failure contracts.

# Code Example

```typescript
import Koa, { Context, Next } from 'koa';

const app = new Koa();
app.use(async (ctx: Context, next: Next) => {
  try { await next(); }
  catch (error) {
    app.emit('error', error, ctx);
    ctx.status = (error as { status?: number }).status ?? 500;
    ctx.body = { error: ctx.status < 500 ? 'request failed' : 'internal server error' };
  }
});
app.use((ctx: Context) => { ctx.throw(400, 'invalid input'); });
app.on('error', (error) => console.error(error));
app.listen(3000);
```

# Common Mistakes

- **Registering the boundary after routes:** It cannot catch earlier middleware failures.
- **Returning raw exception messages:** Internal details can reach clients.

# Follow-up Questions

- **Why does error middleware go first?** (Answer: It must wrap downstream execution.)
- **What does `ctx.throw()` provide?** (Answer: An HTTP-aware error with a status code.)
