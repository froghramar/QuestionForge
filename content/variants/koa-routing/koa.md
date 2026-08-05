---
id: variant.koa-routing.koa
question: question.koa-routing
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa core provides middleware composition but deliberately does not include a router. Use a maintained router middleware such as `@koa/router` to declare method and path handlers, then register both `router.routes()` and `router.allowedMethods()`. Prefixes keep resource or API-version paths cohesive. Register an outer error handler before the router and a fallback after it if the API needs a custom 404 body.

Route parameters from `ctx.params` and query values from `ctx.query` are untrusted strings. Validate them before use. Router order matters when patterns overlap, and route handlers should set the body or status rather than manipulating Node’s raw response.

# Why It Matters

Explicit routing composition is Koa’s design; correctly wiring router middleware avoids silent 404s and inconsistent method responses.

# Code Example

```typescript
import Koa, { Context } from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router({ prefix: '/api/v1' });
router.get('/users/:id', (ctx: Context) => { ctx.body = { id: ctx.params.id }; });
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
```

# Common Mistakes

- **Creating a router but not registering `router.routes()`:** None of its handlers can run.
- **Trusting `ctx.params.id` as a valid identifier:** It remains client-controlled input.

# Follow-up Questions

- **Why call `allowedMethods()`?** (Answer: It handles unsupported methods with appropriate HTTP behavior.)
- **Where does a custom 404 fallback go?** (Answer: After router middleware so matched routes run first.)
