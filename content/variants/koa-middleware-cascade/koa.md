---
id: variant.koa-middleware-cascade.koa
question: question.koa-middleware-cascade
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa composes async middleware in a cascade. 

```mermaid
sequenceDiagram
    participant Request
    participant M1 as Middleware 1
    participant M2 as Middleware 2
    participant Handler
    
    Request->>M1: enter
    M1->>M2: await next()
    M2->>Handler: await next()
    Handler-->>M2: return
    M2-->>M1: return from next()
    M1-->>Request: Response
    
    Note over M1,Handler: Downstream (Before next)
    Note over Handler,M1: Upstream (After next)
```

Code before `await next()` runs while the request moves downstream; code after it runs as the stack unwinds upstream. Middleware registered first is the outermost wrapper. This makes timing, transaction cleanup, response transformation, and global errors natural: wrap `await next()` and act once downstream middleware has completed.

Calling no `next()` intentionally short-circuits the request, which is appropriate for authentication rejection or a cached response. Accidentally omitting it prevents later routes from running. Unlike a linear callback pipeline, Koa middleware can reliably perform work both before and after the handler through normal `async` control flow.

# Why It Matters

Understanding the cascade prevents incorrect logging, missing cleanup, and middleware order bugs.

# Code Example

```typescript
import Koa, { Context, Next } from 'koa';

const app = new Koa();
app.use(async (ctx: Context, next: Next) => {
  const start = Date.now();
  await next();
  ctx.set('X-Response-Time', `${Date.now() - start}ms`);
});
app.use((ctx: Context) => { ctx.body = { ok: true }; });
app.listen(3000);
```

# Common Mistakes

- **Forgetting `await next()`:** Later middleware and routes never execute.
- **Writing response logic before downstream work:** A later handler can overwrite the intended result.

# Follow-up Questions

- **Why register error middleware first?** (Answer: It must wrap every downstream middleware.)
- **Can middleware end a request early?** (Answer: Yes, by setting a response and not calling `next()`.)
