---
id: variant.async-await.express
question: question.async-await
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

In Express, an `async` route handler returns a Promise. `await` pauses that handler’s continuation until the awaited Promise settles; it does not block Node.js from serving other events. In Express 5, if the Promise returned by a route or middleware rejects, Express calls the error chain automatically. This makes ordinary asynchronous handlers concise: return or await the work, then send one response.

That guarantee covers the promise Express receives. If a handler starts detached callback work, uses a timer, or starts a Promise without returning or awaiting it, its later error is not necessarily connected to the request. Avoid fire-and-forget work in a request handler unless it has its own error handling and lifecycle. Do not mix callback completion and `await` for the same operation, and do not send a response before asynchronous work that determines its result completes.

# Why It Matters

Correct async flow prevents unhandled rejections, double responses, and errors that bypass the application’s API error contract.

# Code Example

```typescript
import express, { NextFunction, Request, Response } from 'express';

const app = express();
async function findUser(id: string): Promise<{ id: string; name: string }> {
  if (id === '0') throw new Error('missing');
  return { id, name: 'Ada' };
}
app.get('/users/:id', async (req: Request, res: Response) => {
  const user = await findUser(req.params.id);
  return res.json(user);
});
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => res.status(404).json({ error: 'not found' }));
app.listen(3000);
```

# Common Mistakes

- **Starting an async operation without awaiting or returning it:** Its failure can escape Express’s error flow.
- **Sending a response twice after `await`:** The second write causes headers-sent errors and an unreliable client result.

# Follow-up Questions

- **Does `await` block the Node.js event loop?** (Answer: No; it suspends that async function while the event loop can process other work.)
- **Do callback errors auto-reach Express 5 error middleware?** (Answer: No; callback errors must be passed to `next(err)`.)
