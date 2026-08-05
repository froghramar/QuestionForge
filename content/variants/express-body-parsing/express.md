---
id: variant.express-body-parsing.express
question: question.express-body-parsing
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Express does not parse request bodies by default. Mount `express.json()` before routes that read `req.body` to parse requests whose `Content-Type` identifies JSON. Configure a realistic size limit so a client cannot consume memory with an unexpectedly large payload. `express.urlencoded()` is for form-encoded bodies; it has separate semantics and should be enabled only when the API accepts that format. Multipart forms, especially file uploads, need dedicated streaming middleware rather than `express.json()`.

A parsed body is still untrusted data. Validate its schema, types, lengths, and allowed fields before passing it to domain or persistence code. Handle parser failures in the global error middleware and return a client-safe 400 response for malformed JSON. Mount parser middleware deliberately: a global parser is convenient for a JSON API, whereas a router-level parser limits work on endpoints that actually need it.

# Why It Matters

Correct parser configuration prevents undefined request bodies, resource exhaustion, and accidental acceptance of unvalidated data.

# Code Example

```typescript
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json({ limit: '100kb' }));
app.post('/messages', (req: Request, res: Response) => {
  const { text } = req.body as { text?: unknown };
  if (typeof text !== 'string' || text.length > 500) return res.sendStatus(400);
  return res.status(201).json({ text });
});
app.listen(3000);
```

# Common Mistakes

- **Mounting `express.json()` after the route:** The handler runs before the body is parsed.
- **Equating parsing with validation:** A syntactically valid JSON value can still violate the endpoint contract.

# Follow-up Questions

- **What status code fits malformed JSON?** (Answer: 400 Bad Request.)
- **Why use a body limit?** (Answer: It bounds memory and parsing work per request.)
