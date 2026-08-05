---
id: variant.express-proxy-trust.express
question: question.express-proxy-trust
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Behind a reverse proxy, the connection from proxy to Express may be plain HTTP even though the client originally used HTTPS. The proxy supplies forwarding headers such as `X-Forwarded-Proto` and `X-Forwarded-For`. Express ignores these by default; `trust proxy` tells it which immediate proxy hops may be trusted when deriving `req.ip`, `req.protocol`, and `req.secure`.

Trust only the exact network boundary you control—for example, one known proxy hop or a configured subnet. Setting `trust proxy` to `true` when clients can directly reach the application lets clients spoof forwarding headers. That can bypass IP-based controls, corrupt audit logs, or make an application think a request is secure. The proxy must also overwrite, not merely append to, untrusted forwarding headers received from the public internet.

# Why It Matters

Proxy trust affects secure cookies, redirects, client-IP rate limits, and security logging. A permissive setting changes the application’s trust boundary.

# Code Example

```typescript
import express, { Request, Response } from 'express';

const app = express();
app.set('trust proxy', 1); // Exactly one controlled proxy hop.
app.get('/connection', (req: Request, res: Response) => {
  return res.json({ ip: req.ip, secure: req.secure, protocol: req.protocol });
});
app.listen(3000);
```

# Common Mistakes

- **Using `trust proxy: true` without a controlled network path:** A direct client can spoof `X-Forwarded-For` or `X-Forwarded-Proto`.
- **Ignoring multi-hop topology:** Trusting one hop when requests traverse more can produce the proxy IP instead of the client IP.

# Follow-up Questions

- **Why does `req.secure` matter for sessions?** (Answer: It often determines whether the app can safely set or require secure cookies.)
- **Who should sanitize forwarding headers?** (Answer: The trusted edge proxy should replace untrusted values before forwarding.)
