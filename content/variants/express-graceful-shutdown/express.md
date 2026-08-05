---
id: variant.express-graceful-shutdown.express
question: question.express-graceful-shutdown
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

On `SIGTERM` or `SIGINT`, an Express service should begin draining rather than exit immediately. Mark the process unready so the load balancer stops sending new work, call `server.close()` to stop accepting new connections, and allow existing requests to finish. Then close database pools, queues, and telemetry exporters. The shutdown path must have a deadline: if a request never finishes, log the failure and force termination after the orchestrator’s grace period.

Make the handler idempotent because a process can receive more than one signal. `server.close()` does not close every long-lived or idle connection in every deployment, so production services may also track sockets or use server timeouts. Avoid `process.exit()` before asynchronous cleanup completes; setting `process.exitCode` after cleanup is safer.

# Why It Matters

Graceful shutdown avoids dropped writes, half-finished responses, and corrupted background work during deploys and autoscaling events.

# Code Example

```typescript
import express from 'express';

const app = express();
app.get('/', (_req, res) => res.send('ok'));
const server = app.listen(3000);
let stopping = false;
async function shutdown() {
  if (stopping) return;
  stopping = true;
  server.close(() => { process.exitCode = 0; });
  setTimeout(() => process.exit(1), 25_000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

# Common Mistakes

- **Calling `process.exit()` as soon as a signal arrives:** In-flight responses and async cleanup are abandoned.
- **Closing the database before draining HTTP:** Active handlers can fail while they are still using the pool.

# Follow-up Questions

- **What should readiness return while draining?** (Answer: A failing response so new traffic is removed before dependencies are closed.)
- **Why is a timeout needed?** (Answer: A stuck request must not prevent a replacement deployment forever.)
