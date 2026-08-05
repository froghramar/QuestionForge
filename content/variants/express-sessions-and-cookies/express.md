---
id: variant.express-sessions-and-cookies.express
question: question.express-sessions-and-cookies
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

A cookie is client-side storage sent with matching requests. A server-side session normally keeps the actual session data in a shared store and puts only an opaque, signed session identifier in a cookie. This makes revocation and server-controlled updates practical, while keeping user data out of a client-readable token. A session is not automatically secure merely because it is server-side: rotate its identifier at login, expire it, and destroy it at logout.

Set `HttpOnly` so browser JavaScript cannot read the cookie, `Secure` so it travels only over HTTPS, and a deliberate `SameSite` policy. `SameSite` can reduce cross-site cookie sending but is not a replacement for CSRF protection when cross-site state-changing requests are possible. In a scaled deployment, never use a process-local session store; every replica must reach the same production-grade store.

# Why It Matters

Session mistakes lead to account takeover, logout failures during load balancing, or CSRF exposure that only appears after deployment.

# Code Example

```typescript
import crypto from 'node:crypto';
import express, { Request, Response } from 'express';

const app = express();
app.post('/login', (_req: Request, res: Response) => {
  const sessionId = crypto.randomUUID(); // Persist this opaque ID in a shared session store.
  res.cookie('sid', sessionId, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 3_600_000 });
  return res.sendStatus(204);
});
app.listen(3000);
```

# Common Mistakes

- **Putting sensitive profile data in a readable cookie:** Client-side values can be disclosed or altered unless appropriately protected.
- **Using a local memory session store in a fleet:** A request routed to another instance will not find its session.

# Follow-up Questions

- **Why rotate a session identifier after login?** (Answer: It prevents session fixation by replacing any pre-authentication identifier.)
- **Does `HttpOnly` prevent CSRF?** (Answer: No; browsers still attach HttpOnly cookies to requests.)
