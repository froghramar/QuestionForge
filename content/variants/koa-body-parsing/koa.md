---
id: variant.koa-body-parsing.koa
question: question.koa-body-parsing
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa core does not parse bodies. Mount a parser such as `koa-bodyparser` before the routers that read `ctx.request.body`, configure a realistic size limit, and handle malformed payloads through the outer error boundary. The parser turns selected content types into JavaScript values; it does not validate field types, required fields, business rules, or authorization.

Keep multipart and large-file handling separate, because JSON parsers are not upload parsers and buffering large data can exhaust the process. Validate the parsed input at the route boundary and pass a narrow normalized object to domain code.

# Why It Matters

Correct parser placement and limits protect API capacity and prevent handlers from operating on undefined or unsafe input.

# Code Example

```typescript
import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
app.use(bodyParser({ jsonLimit: '100kb' }));
app.use((ctx: Context) => {
  const { name } = ctx.request.body as { name?: unknown };
  ctx.assert(typeof name === 'string', 400, 'name is required');
  ctx.status = 201; ctx.body = { name };
});
app.listen(3000);
```

# Common Mistakes

- **Registering the parser after routes:** The body is unavailable when a handler runs.
- **Treating parsed JSON as valid:** Malformed domain data still reaches application code.

# Follow-up Questions

- **Why set `jsonLimit`?** (Answer: It bounds per-request parsing and memory use.)
- **Does this parse multipart uploads?** (Answer: No; use dedicated multipart middleware.)
