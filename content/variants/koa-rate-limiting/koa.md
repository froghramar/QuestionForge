---
id: variant.koa-rate-limiting.koa
question: question.koa-rate-limiting
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Rate limiting needs a defined key, policy, and distributed storage model. Limit by an API key, authenticated user, or tenant when available; use IP carefully because NAT and proxy trust affect it. In a multi-instance Koa deployment, use a shared atomic store or enforce limits at the gateway. Return 429 and a retry indication without revealing sensitive account state.

# Why It Matters

Correct limits protect availability without unfairly blocking legitimate customers.

# Code Example

```typescript
import Koa, { Context, Next } from 'koa';

const app = new Koa(); const seen = new Map<string, number>();
app.use(async (ctx: Context, next: Next) => {
  const count = (seen.get(ctx.ip) ?? 0) + 1; seen.set(ctx.ip, count);
  if (count > 5) { ctx.status = 429; ctx.set('Retry-After', '60'); return; }
  await next();
});
app.use((ctx: Context) => { ctx.body = { ok: true }; }); app.listen(3000);
```

# Common Mistakes

- **Using process-local counters across replicas:** Each instance grants a separate quota.
- **Using client IP without proxy controls:** The identity can be wrong or spoofed.

# Follow-up Questions

- **What policy permits controlled bursts?** (Answer: Token bucket.)
- **Why also limit users?** (Answer: A user can distribute abuse across many IPs.)
