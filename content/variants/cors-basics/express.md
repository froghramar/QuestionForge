---
id: variant.cors-basics.express
question: question.cors-basics
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

CORS is a browser protocol enforced through response headers. An Express API must explicitly opt in when a browser page from one origin should read its response from another origin. For simple requests, set a matching `Access-Control-Allow-Origin` response header. For non-simple requests, such as a JSON `POST` with an authorization header, browsers first send an `OPTIONS` preflight; the server must allow the intended origin, method, and request headers.

Configure CORS as an allow-list based on the actual client origins. If the API uses cookies or other credentials, set `Access-Control-Allow-Credentials: true` and return a specific allowed origin—not `*`. CORS is not authentication, authorization, CSRF protection, or a way to protect an API from non-browser callers. The server must enforce each of those separately.

# Why It Matters

An overly broad policy can expose credentialed browser responses, while an incomplete preflight policy causes client failures that look unrelated to the API endpoint.

# Code Example

```typescript
import express, { NextFunction, Request, Response } from 'express';

const app = express();
const origin = 'https://app.example.com';
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.get('origin') === origin) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'GET,POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
});
app.get('/profile', (_req: Request, res: Response) => res.json({ name: 'Ada' }));
app.listen(3000);
```

# Common Mistakes

- **Thinking CORS rejects malicious server-to-server requests:** Non-browser clients do not enforce browser CORS rules.
- **Using wildcard origin with credentials:** Browsers will not allow credentialed responses with `Access-Control-Allow-Origin: *`.

# Follow-up Questions

- **What triggers a preflight request?** (Answer: Non-simple methods, headers, or content types cause the browser to issue `OPTIONS` first.)
- **Should CORS replace CSRF controls for cookies?** (Answer: No; CORS controls response reading, while CSRF defenses protect state-changing cookie-based requests.)
