---
id: variant.async-await.koa
question: question.async-await
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa is built around async middleware. `await next()` suspends the current middleware while the downstream stack runs, then resumes it during unwinding. An `await` of ordinary I/O suspends only that async function, allowing the Node.js event loop to process other work. Rejections from awaited work propagate to an outer Koa error boundary.

Always await or return work that determines a request’s result. Detached promises and callback errors are not reliably connected to the request lifecycle, so handle them independently or forward them through a controlled promise.

# Why It Matters

Correct async control flow ensures errors reach the API boundary instead of becoming unhandled rejections or double responses.

# Code Example

```typescript
import Koa, { Context } from 'koa';

const app = new Koa();
async function findUser(id: string) { if (id === '0') throw new Error('missing'); return { id }; }
app.use(async (ctx: Context) => { ctx.body = await findUser(ctx.query.id as string); });
app.listen(3000);
```

# Common Mistakes

- **Starting a promise without awaiting it:** Errors can escape the request boundary.
- **Assuming `await` blocks Node.js:** It pauses the middleware, not the whole event loop.

# Follow-up Questions

- **Why wrap `await next()` in a try/catch?** (Answer: To centralize downstream errors.)
- **Does Koa use callback-style `next(err)`?** (Answer: No; errors propagate through thrown exceptions and rejected promises.)
