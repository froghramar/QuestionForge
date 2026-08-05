---
id: variant.express-rate-limiting.express
question: question.express-rate-limiting
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Rate limiting restricts requests over time to control abuse and protect capacity. Define the protected operation, the key—for example an API key, authenticated user, tenant, or IP—the policy, and the response. Authentication and password-reset endpoints usually require stricter limits than public reads. Return 429 with a useful retry indication, but do not disclose whether a specific account exists.

An in-memory counter works only for a single process and loses state on restart. In a horizontally scaled Express service, enforce at an API gateway or use a shared store that can increment and expire counters atomically. IP-only limits are weak behind NATs and proxies, so choose the identity available at that stage and layer protections. Rate limiting should complement input limits, authentication, and upstream capacity controls.

# Why It Matters

Poor limits either fail open under scale or block many legitimate customers sharing an address. Well-designed limits protect reliability and credentials.

# Code Example

```typescript
import express, { NextFunction, Request, Response } from 'express';

const app = express();
const attempts = new Map<string, number>();
function demoLimit(req: Request, res: Response, next: NextFunction) {
  const key = req.ip ?? 'unknown';
  const count = (attempts.get(key) ?? 0) + 1;
  attempts.set(key, count);
  if (count > 5) return res.status(429).set('Retry-After', '60').json({ error: 'try again later' });
  return next();
}
app.post('/login', demoLimit, (_req: Request, res: Response) => res.sendStatus(204));
app.listen(3000);
```

# Common Mistakes

- **Deploying a process-local counter as a distributed limiter:** Each replica grants its own full quota.
- **Trusting `req.ip` without proxy configuration:** A spoofed or proxy IP can make the limit ineffective or unfair.

# Follow-up Questions

- **Which algorithm handles bursts better than a fixed window?** (Answer: Token bucket permits controlled bursts while maintaining an average rate.)
- **Why limit authenticated users as well as IPs?** (Answer: One user can distribute abuse across many addresses.)
