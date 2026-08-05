---
id: variant.express-health-checks.express
question: question.express-health-checks
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Liveness answers whether the process is running well enough to avoid a restart; it should be cheap and not depend on every downstream system. Readiness answers whether this instance should receive new traffic. It should remain false during startup until essential initialization completes and switch false at the start of graceful shutdown, before HTTP and database resources are closed.

Dependency checks in readiness should be targeted and time-bounded. If every request to `/health` performs a slow fan-out to all dependencies, the endpoint can amplify an outage and trigger unnecessary restarts. Report a compact status to callers and put detailed diagnostics in restricted telemetry. Health endpoints should avoid authentication only when the deployment network restricts who can reach them; otherwise protect them as appropriate.

# Why It Matters

Accurate probes prevent traffic being sent to a draining process and avoid restart loops caused by transient downstream failures.

# Code Example

```typescript
import express, { Request, Response } from 'express';

const app = express();
let ready = false;
async function initialize() { ready = true; }
app.get('/livez', (_req: Request, res: Response) => res.sendStatus(200));
app.get('/readyz', (_req: Request, res: Response) => res.sendStatus(ready ? 200 : 503));
await initialize();
app.listen(3000);
```

# Common Mistakes

- **Using a database query as the only liveness check:** A database outage can restart otherwise healthy processes repeatedly.
- **Leaving readiness true while draining:** Load balancers continue to send new requests during shutdown.

# Follow-up Questions

- **When should readiness become true?** (Answer: After the application has completed required initialization.)
- **Should health responses include secrets or stack traces?** (Answer: No; expose only the minimum operational status.)
