---
id: variant.koa-api-versioning.koa
question: question.koa-api-versioning
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Create a new API version for a breaking client-contract change, not for every deployment or optional addition. Versioned routers such as `/api/v1` and `/api/v2` isolate transport contracts while shared domain services and policies avoid duplicated business logic. Publish a migration guide and sunset window, measure remaining usage, and notify consumers before retiring an old version.

# Why It Matters

Versioning lets clients upgrade safely without turning old interfaces into permanent unowned debt.

# Code Example

```typescript
import Koa, { Context } from 'koa';
import Router from '@koa/router';

const app = new Koa(); const v1 = new Router({ prefix: '/api/v1' }); const v2 = new Router({ prefix: '/api/v2' });
v1.get('/users/:id', (ctx: Context) => { ctx.body = { id: ctx.params.id, name: 'Ada' }; });
v2.get('/users/:id', (ctx: Context) => { ctx.body = { id: ctx.params.id, profile: { name: 'Ada' } }; });
app.use(v1.routes()).use(v2.routes()); app.listen(3000);
```

# Common Mistakes

- **Versioning every additive field:** It creates needless operational complexity.
- **Removing a version without data and notice:** Existing integrations break unexpectedly.

# Follow-up Questions

- **What is a breaking change?** (Answer: A changed or removed observable contract clients depend on.)
- **Why use separate routers?** (Answer: They isolate HTTP contracts and middleware.)
