---
id: variant.express-static-files.express
question: question.express-static-files
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Use `express.static` to serve assets from an explicit directory and mount it beneath a public URL prefix. The filesystem root should be an absolute path derived from the deployed application directory, not from the current working directory, which can vary between local development and process managers. The static middleware handles path resolution relative to that root and should not be replaced by manually concatenating user-controlled paths.

Static caching must reflect asset mutability. Files whose names include a content hash can be cached for a long time because new content receives a new URL. HTML entry points and mutable manifests need shorter caching so clients discover a deployment promptly. Express can serve modest assets, but a CDN or reverse proxy is generally a better place for high-volume public files because it removes work from Node.js and brings assets closer to clients.

# Why It Matters

Correct static configuration prevents path exposure and stale deployments; moving large asset traffic to edge infrastructure improves API capacity and latency.

# Code Example

```typescript
import path from 'node:path';
import express, { Request, Response } from 'express';

const app = express();
const publicDir = path.join(process.cwd(), 'public');
app.use('/assets', express.static(publicDir, { immutable: true, maxAge: '1y' }));
app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));
app.listen(3000);
```

# Common Mistakes

- **Serving a directory derived from a request parameter:** Path traversal mistakes can expose files outside the intended public root.
- **Caching HTML for a year like hashed assets:** Clients can remain on an obsolete entry point after a deployment.

# Follow-up Questions

- **Why mount static files at `/assets`?** (Answer: A dedicated prefix avoids conflicts with API and application routes.)
- **When is a CDN preferable?** (Answer: When public assets are high-volume, globally distributed, or should not consume Node.js capacity.)
