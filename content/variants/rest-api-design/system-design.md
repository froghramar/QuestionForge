---
id: variant.rest-api-design.system-design
question: question.rest-api-design
technology: tech.system-design
---
# Expected Answer

A well-designed REST API exposes stable, resource-oriented contracts over HTTP. Start with domain nouns and predictable collection and item paths, such as `GET /orders`, `POST /orders`, and `GET /orders/{id}`. Use HTTP methods for their intended semantics: safe reads with `GET`, creation with `POST`, complete replacement with `PUT`, and a documented partial update format with `PATCH`. Return meaningful status codes and a consistent problem-response shape so clients can reliably distinguish validation failures, conflicts, and transient errors.

Design for unreliable networks. A client may time out after the server completes a request, then retry. For externally visible side effects such as order creation or payment capture, accept an idempotency key, record the result, and return the same result for a matching retry. Paginate collections—prefer opaque cursors for changing, large datasets—and filter and sort with documented allowlists. Evolve contracts additively where possible; version only when a breaking change cannot be avoided, and deprecate old behavior with a communicated migration period.

# Why It Matters

An API contract becomes a dependency for mobile apps, web clients, integrations, and other services. Ambiguous HTTP behavior or retry-unsafe writes turns ordinary packet loss into duplicate orders, confusing user experiences, and costly support incidents.

# Example Code

```typescript
import express from "express";

const app = express();
app.use(express.json());
const responses = new Map<string, { status: number; body: unknown }>();

app.post("/orders", (req, res) => {
  const key = req.header("Idempotency-Key");
  if (!key) return res.status(400).json({ title: "Idempotency-Key is required" });
  const prior = responses.get(key);
  if (prior) return res.status(prior.status).json(prior.body);

  const body = { id: crypto.randomUUID(), status: "pending", item: req.body.item };
  responses.set(key, { status: 201, body });
  return res.location(`/orders/${body.id}`).status(201).json(body);
});
```

# Common Mistakes

- **Using action-shaped paths for ordinary resources:** Endpoints such as `/createOrder` discard HTTP semantics and become inconsistent as the API grows.
- **Treating a timeout as proof a write failed:** Retrying a non-idempotent `POST` can create duplicate records or charges.
- **Using offset pagination for a rapidly changing feed:** Inserts and deletes shift offsets, producing missing or duplicate items between pages.

# Follow-up Questions

- **When is `PUT` appropriate?** (Answer: When the client supplies a complete representation and repeating that request should produce the same resource state.)
- **How should an API report validation failures?** (Answer: Use a stable 4xx problem format that identifies invalid fields without leaking internal details.)

# Related Questions

- [PUT vs PATCH](/questions/put-vs-patch)
- [Load Balancing Basics](/questions/load-balancing-basics)

# References

- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457)
