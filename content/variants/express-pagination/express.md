---
id: variant.express-pagination.express
question: question.express-pagination
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

An Express collection route should validate pagination inputs before translating them into a data-store query. Enforce a default and a maximum page size so a client cannot request an unbounded result set. Offset pagination (`offset` and `limit`) is familiar and suitable for small or administrative datasets, but deep offsets can become expensive and concurrent inserts or deletes can shift items between pages.

Cursor pagination uses an opaque continuation token based on a stable, indexed ordering such as `(createdAt, id)`. The next query asks for values after that tuple, which avoids deep scans and yields more stable traversal under writes. Sign or encode cursors so clients cannot inject arbitrary query fragments, and return a next cursor only when another page exists. The transport layer should expose the contract; persistence code should own query details.

# Why It Matters

Unbounded and inefficient collection endpoints can overload the database, while unstable pages cause clients to miss or duplicate records.

# Code Example

```typescript
import express, { Request, Response } from 'express';

const app = express();
app.get('/events', (req: Request, res: Response) => {
  const requested = Number(req.query.limit ?? 20);
  const limit = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), 100) : 20;
  const items = Array.from({ length: limit }, (_, id) => ({ id }));
  return res.json({ items, nextCursor: items.length === limit ? String(limit) : null });
});
app.listen(3000);
```

# Common Mistakes

- **Allowing an arbitrary `limit`:** A client can create expensive database and response workloads.
- **Using an unstable sort for cursors:** Equal or reordered records lead to duplicates and gaps.

# Follow-up Questions

- **Why include an ID in a timestamp cursor?** (Answer: It breaks ties and creates deterministic ordering.)
- **When is offset pagination adequate?** (Answer: Small, bounded datasets or administrative UIs where deep-page cost is acceptable.)
