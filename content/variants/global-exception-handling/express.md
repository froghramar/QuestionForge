---
id: variant.global-exception-handling.express
question: question.global-exception-handling
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Express centralizes request errors with error-handling middleware, declared after routes and normal middleware with the signature `(err, req, res, next)`. Route code should throw or reject for exceptional failures; Express 5 forwards rejections from returned promises to the error chain. Callback-style asynchronous APIs remain different: pass their error to `next(err)` because a later callback is outside the route handler’s synchronous execution.

The global handler should classify known operational errors into safe status codes and a consistent response body, log the original error with a request ID, and return a generic 500 response for unexpected failures. Do not expose stacks, SQL messages, tokens, or internal hostnames. If `res.headersSent` is true, delegate with `next(err)` so Express’s default handler can close or complete the already-started response correctly.

# Why It Matters

A single response policy prevents information leaks and gives clients predictable failures while preserving the diagnostic detail operators need.

# Code Example

```typescript
import express, { NextFunction, Request, Response } from 'express';

const app = express();
app.get('/users/:id', async (_req: Request, _res: Response) => { throw new Error('database unavailable'); });
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error({ err, path: req.path });
  if (res.headersSent) return next(err);
  return res.status(500).json({ error: 'internal server error' });
});
app.listen(3000);
```

# Common Mistakes

- **Registering the error handler before routes:** Errors from later middleware will not reach it as intended.
- **Returning `err.message` for unknown errors:** Internal implementation details can be exposed to clients.

# Follow-up Questions

- **Why must an Express error handler take four arguments?** (Answer: Express uses that signature to classify it as error middleware.)
- **What changes for a streaming response?** (Answer: If headers were sent, delegate to the default handler rather than writing a second response.)
