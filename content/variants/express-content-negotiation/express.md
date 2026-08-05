---
id: variant.express-content-negotiation.express
question: question.express-content-negotiation
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

`Content-Type` describes the representation being sent in a request or response; `Accept` tells the server which response representations the client can process. An Express JSON endpoint should reject an unsupported request media type before trying to parse it, then select a response format from the API’s supported types. `req.accepts()` can negotiate against a small, explicit list. If the request is valid but none of the client’s acceptable representations are available, return 406; if the incoming body’s media type is unsupported, return 415.

Content negotiation should not multiply formats without a real client need. JSON is usually the default API representation, while plain text or HTML may help health, download, or browser-oriented endpoints. Always set the response type consistently and include `Vary: Accept` when caches could receive different representations for the same URL.

# Why It Matters

Clear media-type behavior prevents parser confusion, helps clients fail predictably, and avoids cache responses leaking across representation preferences.

# Code Example

```typescript
import express, { Request, Response } from 'express';

const app = express();
app.get('/status', (req: Request, res: Response) => {
  const format = req.accepts(['json', 'text']);
  res.vary('Accept');
  if (format === 'json') return res.json({ ok: true });
  if (format === 'text') return res.type('text').send('ok');
  return res.sendStatus(406);
});
app.listen(3000);
```

# Common Mistakes

- **Using `Accept` to validate a request body:** `Content-Type`, not `Accept`, identifies the representation sent by the client.
- **Ignoring `Vary: Accept` for cacheable negotiated responses:** A cache can serve one client’s representation to another.

# Follow-up Questions

- **When should an API return 415?** (Answer: When the request body has a media type the endpoint does not support.)
- **What does 406 mean?** (Answer: The server cannot provide a representation acceptable to the client.)
