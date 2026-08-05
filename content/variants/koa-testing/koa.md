---
id: variant.koa-testing.koa
question: question.koa-testing
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Build a Koa application independently from the process startup. `app.callback()` returns a Node-compatible request listener, so an HTTP test client can exercise the full middleware stack without the production entry point binding a port. Integration tests should assert status, headers, body contracts, authorization outcomes, parser failures, and error mapping—not only a handler’s returned object.

Use unit tests for pure policy or service functions, but use API tests to catch middleware registration order and routing mistakes. Keep external dependencies deterministic with fakes or disposable test infrastructure, and make setup and cleanup explicit so tests do not share state.

# Why It Matters

Testing the composed application catches defects in the actual HTTP contract while keeping process lifecycle out of tests.

# Code Example

```typescript
import Koa, { Context } from 'koa';

export function createApp() {
  const app = new Koa();
  app.use((ctx: Context) => { ctx.body = { ok: true }; });
  return app;
}

// A test client can call createApp().callback() and assert a 200 JSON response.
```

# Common Mistakes

- **Starting the production listener when importing the test app:** Ports and open handles leak into tests.
- **Testing only the happy path:** Errors and authorization behavior are core API contracts.

# Follow-up Questions

- **What does `app.callback()` return?** (Answer: A Node-compatible request handler.)
- **Why test middleware ordering?** (Answer: It determines parsing, auth, errors, and response behavior.)
