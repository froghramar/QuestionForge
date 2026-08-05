---
id: variant.koa-graceful-shutdown.koa
question: question.koa-graceful-shutdown
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa’s `listen()` returns a Node HTTP server. On `SIGTERM` or `SIGINT`, stop accepting new connections with `server.close()`, allow current requests to finish, then close database pools, queues, and telemetry. Before draining, make readiness fail so the load balancer removes the instance. Use a deadline because a stuck connection should not block rollout forever, and make the signal handler idempotent.

Do not call `process.exit()` immediately: asynchronous response writes and dependency cleanup will be abandoned. Close the server before dependencies because active handlers may still need them.

# Why It Matters

Safe draining prevents lost work and failed client requests during deployment and autoscaling.

# Code Example

```typescript
import Koa, { Context } from 'koa';

const app = new Koa();
app.use((ctx: Context) => { ctx.body = 'ok'; });
const server = app.listen(3000);
let stopping = false;
function shutdown() {
  if (stopping) return;
  stopping = true;
  server.close(() => { process.exitCode = 0; });
  setTimeout(() => process.exit(1), 25_000).unref();
}
process.on('SIGTERM', shutdown);
```

# Common Mistakes

- **Exiting immediately:** In-flight requests are terminated.
- **Closing dependencies first:** Active handlers can fail while draining.

# Follow-up Questions

- **Why fail readiness first?** (Answer: To stop new traffic before closing the server.)
- **Why add a timeout?** (Answer: A stuck request must not block shutdown indefinitely.)
