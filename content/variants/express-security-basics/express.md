---
id: variant.express-security-basics.express
question: question.express-security-basics
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Secure an Express service in layers. Terminate or enforce TLS, set security headers with a maintained middleware such as Helmet, validate and allow-list inputs, authenticate requests, and perform authorization on every protected resource. Configure CORS with explicit allowed origins and methods; CORS is enforced by browsers and does not authorize non-browser clients. Use rate limits for abuse-prone endpoints, but store counters in shared infrastructure when multiple instances serve traffic.

Production error responses must be generic and must not reveal stacks, secrets, SQL, or internal topology. Keep secrets out of source control and inject them through a managed runtime configuration mechanism. Log a correlation ID and safe operational context server-side, rather than returning debugging detail to the client.

# Why It Matters

Most production incidents exploit gaps between controls: a header cannot compensate for missing authorization, and CORS cannot protect a public API from a script or curl request.

# Code Example

```typescript
import express, { NextFunction, Request, Response } from 'express';

const app = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  return next();
});
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.get('origin');
  if (origin === 'https://app.example.com') res.set('Access-Control-Allow-Origin', origin);
  return next();
});
app.get('/health', (req: Request, res: Response) => res.json({ ok: true }));
app.listen(3000);
```

# Common Mistakes

- **Using `Access-Control-Allow-Origin: *` with cookies:** Browsers reject wildcard credentials, and permissive origin reflection can expose data.
- **Using in-memory rate limits across replicas:** Each process has a separate counter, so the effective limit grows with the fleet.

# Follow-up Questions

- **Does Helmet replace output encoding?** (Answer: No; headers reduce risk but do not make unsafe HTML or data handling safe.)
- **Why log a request ID?** (Answer: It connects a client-visible failure to safe server-side diagnostic events.)
