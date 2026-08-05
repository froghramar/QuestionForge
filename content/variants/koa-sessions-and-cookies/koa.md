---
id: variant.koa-sessions-and-cookies.koa
question: question.koa-sessions-and-cookies
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa exposes cookies through `ctx.cookies`. Configure `app.keys` with long random values before using signed cookies; signing detects modification but does not encrypt the cookie value. For browser authentication, prefer an opaque session identifier in a cookie and keep the actual session data in a shared server-side store. Rotate the identifier on login, set an expiry, and destroy it on logout.

Use `httpOnly` to block JavaScript access, `secure` to restrict transmission to HTTPS, and an intentional `sameSite` setting. These controls address different risks; `HttpOnly` does not stop CSRF because the browser still sends the cookie. Never use an in-process session store in a load-balanced deployment.

# Why It Matters

Cookie and session mistakes create account-takeover and reliability failures that often emerge only after scaling.

# Code Example

```typescript
import crypto from 'node:crypto';
import Koa, { Context } from 'koa';

const app = new Koa();
app.keys = [process.env.COOKIE_KEY ?? 'development-key-change-me'];
app.use((ctx: Context) => {
  const sessionId = crypto.randomUUID();
  ctx.cookies.set('sid', sessionId, { signed: true, httpOnly: true, secure: true, sameSite: 'lax' });
  ctx.status = 204;
});
app.listen(3000);
```

# Common Mistakes

- **Calling signed cookies encrypted:** Their value remains readable by the client.
- **Using one process’s memory for sessions:** Requests on another replica cannot retrieve the session.

# Follow-up Questions

- **Why rotate a session ID on login?** (Answer: It prevents session fixation.)
- **What does `app.keys` enable?** (Answer: Signing and verifying Koa cookies.)
