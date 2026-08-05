---
id: variant.express-authentication-authorization.express
question: question.express-authentication-authorization
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Authentication middleware verifies credentials, then attaches a minimal trusted principal to the request for later handlers. With bearer tokens, verify the signature using an explicitly allowed algorithm and validate expiry, issuer, and audience before trusting claims. Authorization comes afterward and answers whether that authenticated principal may perform this action on this resource. A role check may be useful, but ownership and tenant boundaries often require a resource-level policy.

Keep credential parsing and verification in reusable middleware, but keep a policy close enough to the route or domain service that it can consider the resource being accessed. Return 401 when credentials are absent or invalid and 403 when identity is valid but lacks permission. Never take the user ID or role from the JSON body as proof of identity.

# Why It Matters

Separating identity from permission prevents broken access control. It also makes it easier to audit protected routes and change identity providers without rewriting authorization logic.

# Code Example

```typescript
import express, { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express { interface Request { user?: { id: string; role: 'member' } } }
}

const app = express();
function requireUser(req: Request, res: Response, next: NextFunction) {
  if (req.get('authorization') !== 'Bearer demo-token') return res.sendStatus(401);
  req.user = { id: 'u1', role: 'member' };
  return next();
}
app.delete('/posts/:postId', requireUser, (req: Request, res: Response) => {
  const post = { id: 'p1', ownerId: 'u1' };
  if (post.id !== req.params.postId || post.ownerId !== req.user?.id) return res.sendStatus(403);
  return res.sendStatus(204);
});
app.listen(3000);
```

# Common Mistakes

- **Treating decoded JWT data as verified:** Decoding does not validate the signature or claims, so attackers can forge values.
- **Checking only a broad role:** A member may still be forbidden from changing another member’s resource.

# Follow-up Questions

- **Why distinguish 401 from 403?** (Answer: 401 means authentication failed or is missing; 403 means authentication succeeded but authorization failed.)
- **Where should token revocation be enforced?** (Answer: In token/session validation or an authorization layer with a revocation-aware store.)
