---
id: variant.koa-file-uploads.koa
question: question.koa-file-uploads
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Use multipart-aware middleware for file uploads; `koa-bodyparser` handles ordinary body formats, not file streams. Configure strict byte and file-count limits, generate storage keys instead of trusting names, validate actual content where appropriate, and stream large uploads to controlled storage. Keep untrusted files outside public and executable directories, then authorize every private download.

# Why It Matters

Upload paths are exposed to memory exhaustion, unsafe content, and private-file disclosure.

# Code Example

```typescript
import Koa, { Context } from 'koa';

const app = new Koa();
app.use((ctx: Context) => {
  ctx.assert(ctx.is('multipart/form-data'), 415, 'multipart required');
  ctx.status = 501; ctx.body = { error: 'configure streaming multipart middleware' };
});
app.listen(3000);
```

# Common Mistakes

- **Trusting the original filename:** It is client-controlled and unsafe as a storage path.
- **Buffering large uploads in memory:** A few requests can exhaust the process.

# Follow-up Questions

- **Why use generated storage keys?** (Answer: They separate storage identity from untrusted filenames.)
- **Should private uploads use static middleware?** (Answer: No; that bypasses per-request authorization.)
