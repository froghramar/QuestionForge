---
id: variant.custom-middleware.express
question: question.custom-middleware
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Express middleware is a function in the request-response chain with access to `req`, `res`, and `next`. It can inspect or enrich the request, send a response to end the cycle, or call `next()` to continue. Mount cross-cutting policies such as request IDs, authentication, validation, or logging at the narrowest appropriate scope: application-wide, a router, or a specific route. Ordering is behavior: parsers must run before handlers that use `req.body`, authentication before protected routes, and error middleware last.

Every normal middleware must either complete the response or call `next()` exactly once. In Express 5, a rejected promise from an async middleware is forwarded to the error chain, but callback-based async failures must still call `next(err)`. Error middleware is distinguished by its four-argument signature.

# Why It Matters

The middleware stack is the control plane for an Express service. An ordering error can bypass security, leave requests hanging, or return an inconsistent response.

# Code Example

```typescript
import crypto from 'node:crypto';
import express, { NextFunction, Request, Response } from 'express';

declare global { namespace Express { interface Request { requestId: string } } }

const app = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestId = crypto.randomUUID();
  res.set('X-Request-Id', req.requestId);
  return next();
});
app.get('/orders', (req: Request, res: Response) => res.json({ requestId: req.requestId }));
app.listen(3000);
```

# Common Mistakes

- **Neither returning a response nor calling `next()`:** The request remains open until a timeout.
- **Mounting authorization after protected routes:** The handler may execute before the policy is evaluated.

# Follow-up Questions

- **How is error middleware recognized?** (Answer: It has the four-argument signature `(err, req, res, next)`.)
- **When should middleware be router-level?** (Answer: When only one route group needs the policy.)
