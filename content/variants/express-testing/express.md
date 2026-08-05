---
id: variant.express-testing.express
question: question.express-testing
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Build the Express application separately from process startup: an app factory configures middleware and routes, while a small entry point calls `listen()`. Tests can then invoke the app in-process with an HTTP test client without binding a real port. Test the observable contract: status code, content type, headers, body shape, and key error responses. Keep database, queues, clocks, and identity providers deterministic through test doubles or disposable integration infrastructure.

Use unit tests for pure domain functions and middleware branches, but retain API-level tests for route matching, parser order, validation, authentication, serialization, and error mapping. A happy-path-only suite gives false confidence; include invalid bodies, missing credentials, forbidden resources, and unexpected failures. Each test should construct only the state it needs and clean up any external resources.

# Why It Matters

HTTP integration tests catch wiring defects that type checks and unit tests cannot, while separating startup prevents ports and process state from leaking into tests.

# Code Example

```typescript
import express, { Request, Response } from 'express';

export function createApp() {
  const app = express();
  app.get('/health', (_req: Request, res: Response) => res.status(200).json({ ok: true }));
  return app;
}

// server.ts: createApp().listen(3000);
// A test client can call createApp() directly and assert GET /health returns 200.
```

# Common Mistakes

- **Calling `listen()` in the module imported by tests:** It creates port conflicts and leaves open handles.
- **Only asserting the JSON body:** Status codes and headers are part of the public HTTP contract too.

# Follow-up Questions

- **What should an authorization integration test assert?** (Answer: Both a valid allowed request and a valid authenticated request that is denied.)
- **Why use a disposable database for some tests?** (Answer: It validates real query and transaction behavior without contaminating shared data.)
