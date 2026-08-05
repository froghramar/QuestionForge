---
id: variant.koa-content-negotiation.koa
question: question.koa-content-negotiation
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

`Content-Type` identifies the representation sent in a request or response, while `Accept` lists representations the client can receive. Use `ctx.accepts()` to choose from a small, explicit list of formats the route supports. Return 415 when an incoming body uses an unsupported media type and 406 when no acceptable response format is available. For cacheable negotiated responses, vary by `Accept`.

# Why It Matters

Media-type correctness prevents parser confusion and makes API behavior predictable for different clients.

# Code Example

```typescript
import Koa, { Context } from 'koa';

const app = new Koa();
app.use((ctx: Context) => {
  const format = ctx.accepts('json', 'text'); ctx.vary('Accept');
  if (format === 'json') ctx.body = { ok: true };
  else if (format === 'text') { ctx.type = 'text'; ctx.body = 'ok'; }
  else ctx.status = 406;
});
app.listen(3000);
```

# Common Mistakes

- **Using `Accept` to validate a request body:** The request body is identified by `Content-Type`.
- **Ignoring cache variation:** A cache can return the wrong representation.

# Follow-up Questions

- **When is 415 appropriate?** (Answer: The request body’s media type is unsupported.)
- **What does 406 mean?** (Answer: No supported response representation matches the client’s `Accept` header.)
