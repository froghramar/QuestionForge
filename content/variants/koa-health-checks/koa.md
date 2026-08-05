---
id: variant.koa-health-checks.koa
question: question.koa-health-checks
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Expose a lightweight liveness endpoint to show the process is running and a readiness endpoint to show the instance may receive traffic. Set readiness false during initialization and before graceful shutdown starts. Keep dependency probes focused and bounded: an unbounded fan-out can turn a downstream incident into a restart storm.

# Why It Matters

Accurate probe semantics keep load balancers from routing traffic to processes that are starting or draining.

# Code Example

```typescript
import Koa, { Context } from 'koa';

const app = new Koa(); let ready = false;
app.use((ctx: Context) => {
  if (ctx.path === '/livez') { ctx.status = 200; ctx.body = { ok: true }; return; }
  if (ctx.path === '/readyz') { ctx.status = ready ? 200 : 503; ctx.body = { ready }; return; }
  ctx.status = 404;
});
ready = true; app.listen(3000);
```

# Common Mistakes

- **Using a deep database check for liveness:** Transient dependency outages can restart healthy processes.
- **Leaving readiness true while stopping:** New requests arrive during drain.

# Follow-up Questions

- **When should readiness be true?** (Answer: After required initialization completes.)
- **Why keep liveness cheap?** (Answer: It should detect a wedged process without amplifying failures.)
