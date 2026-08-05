---
id: variant.express-api-versioning.express
question: question.express-api-versioning
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

Version an API when a change breaks an existing client contract: removing or renaming fields, changing their meaning or type, altering required inputs, or changing observable behavior. For HTTP APIs, a URL prefix such as `/api/v1` is often the clearest operational choice because route ownership, documentation, metrics, and deprecation can be separated. Header or media-type versioning can work but is harder for clients and tooling to discover.

Mount each transport version on a router, while sharing domain services and validation primitives where their behavior is genuinely compatible. Do not duplicate the entire application. Publish a sunset date, document migration paths, report usage per version, and notify consumers before removing a deprecated version. Adding optional fields is often backward compatible, but clients that validate responses strictly may still need communication.

# Why It Matters

Versioning avoids breaking deployed clients while allowing the service to evolve. A deprecation plan prevents old contracts from becoming permanent operational debt.

# Code Example

```typescript
import express, { Request, Response } from 'express';

const app = express();
const v1 = express.Router();
const v2 = express.Router();
v1.get('/users/:id', (req: Request, res: Response) => res.json({ id: req.params.id, name: 'Ada' }));
v2.get('/users/:id', (req: Request, res: Response) => res.json({ id: req.params.id, profile: { name: 'Ada' } }));
app.use('/api/v1', v1);
app.use('/api/v2', v2);
app.listen(3000);
```

# Common Mistakes

- **Creating a new version for every additive field:** It adds unnecessary client and operational complexity.
- **Removing a version without usage evidence or notice:** Long-lived integrations can fail without a migration window.

# Follow-up Questions

- **What is a breaking response change?** (Answer: A removed, renamed, or semantically changed field that clients depend on.)
- **Why use routers for versions?** (Answer: They isolate HTTP contracts while allowing shared application logic.)
