---
id: variant.express-routing-and-routers.express
question: question.express-routing-and-routers
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

In Express, a route binds an HTTP method and path to one or more handlers. A handler should either send a response or call `next()` so that the next matching middleware can continue the request. For a small application, routes can live on `app`; in a larger service, create an `express.Router()` per resource area, attach its local middleware, and mount it under a stable prefix. That keeps URL structure and dependencies explicit without creating several Express applications.

Parameters such as `/users/:userId` are matched from the path and arrive as strings in `req.params`; query values arrive in `req.query`. Treat both as untrusted input. Router order matters: specific routes should precede broad parameterized or catch-all routes, and a router only sees requests whose mount path matched.

# Why It Matters

Modular routers make ownership, authentication boundaries, and tests clearer. Poor route ordering or an omitted `next()` can produce unreachable routes or requests that never complete.

# Code Example

```typescript
import express, { Request, Response } from 'express';

const users = express.Router();
users.get('/:userId', (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  if (!Number.isInteger(userId)) return res.status(400).json({ error: 'invalid user id' });
  return res.json({ id: userId, name: 'Ada' });
});

const app = express();
app.use('/api/users', users);
app.listen(3000);
```

# Common Mistakes

- **Mounting a router without its intended prefix:** It changes every endpoint and can unintentionally expose routes at the application root.
- **Putting a catch-all route before specific routes:** It consumes requests before their intended handler can match.

# Follow-up Questions

- **When should middleware be mounted on a router instead of the app?** (Answer: When it applies only to that route subtree, such as resource-specific authorization.)
- **What does `next('route')` do?** (Answer: It skips the remaining handlers for the current route and continues matching the next route.)
