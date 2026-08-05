---
id: variant.express-5-migration.express
question: question.express-5-migration
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Treat the Express 4 to 5 upgrade as a tested behavior change. First confirm the supported Node.js runtime—Express 5 requires Node.js 18 or newer—then run the official migration guidance and integration suite. Pay special attention to route patterns because Express 5 uses a newer `path-to-regexp`: catch-all patterns and optional parameter syntax may require rewrites. Test routers, redirects, 404 behavior, and middleware mounting rather than assuming unit tests cover matching semantics.

Express 5 also forwards a rejection or thrown error from a route handler or middleware that returns a Promise to error middleware. This removes much manual wrapper code for `async` handlers, but it does not catch errors detached from the returned promise, such as an exception in a callback or timer. Keep a final error handler, validate its response contract, and never call `next(err)` after a response has already been safely completed.

# Why It Matters

Upgrade regressions often appear only in rarely used paths, error handling, or fallback routes—the exact places where an API needs predictable behavior.

# Code Example

```typescript
import express, { NextFunction, Request, Response } from 'express';

const app = express();
app.get('/users/:id', async (req: Request, res: Response) => {
  if (req.params.id === '0') throw new Error('not found');
  return res.json({ id: req.params.id });
});
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);
  return res.status(500).json({ error: 'internal error' });
});
app.listen(3000);
```

# Common Mistakes

- **Upgrading Express without checking Node.js:** The application can fail before its routes are even evaluated.
- **Assuming every asynchronous error is auto-forwarded:** Errors in callbacks not returned from the handler must still be passed to `next(err)`.

# Follow-up Questions

- **Why test wildcard routes during migration?** (Answer: Their matching syntax changed with Express 5’s routing dependency.)
- **Does Express 5 remove the need for error middleware?** (Answer: No; it forwards errors, but an application still needs a secure response policy.)
