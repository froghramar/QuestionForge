---
id: variant.koa-static-files.koa
question: question.koa-static-files
technology: tech.koa
---
# Expected Answer (Koa 3.2.1 / Node.js 18+)

Koa uses external static middleware such as `koa-static`. Mount it with an explicit public directory and URL prefix; do not build filesystem paths from request input. Give content-hashed assets long immutable cache lifetimes, but keep HTML and mutable manifests short-lived so clients discover deployments. Use a CDN or reverse proxy for high-volume public content so Node.js capacity remains available for application work.

# Why It Matters

Correct static boundaries avoid file exposure and stale frontend deployments while improving API performance.

# Code Example

```typescript
import path from 'node:path';
import Koa from 'koa';
import serve from 'koa-static';

const app = new Koa();
app.use(serve(path.join(process.cwd(), 'public'), { maxage: 86_400_000 }));
app.listen(3000);
```

# Common Mistakes

- **Serving from a request-derived path:** Path traversal can expose unintended files.
- **Caching HTML as immutable:** Clients can remain on obsolete entry points.

# Follow-up Questions

- **Why use a public root?** (Answer: It limits which files static middleware can serve.)
- **When use a CDN?** (Answer: For high-volume or globally distributed public assets.)
