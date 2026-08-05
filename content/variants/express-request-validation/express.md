---
id: variant.express-request-validation.express
question: question.express-request-validation
technology: tech.express
---
# Expected Answer (Express 5.1.0 / Node.js 18+)

`express.json()` only parses a JSON payload; it does not prove the data has the fields, types, limits, or allowed values an endpoint needs. Validate all client-controlled inputs near the route boundary: path parameters, query strings, headers, and the parsed body. A schema library can make this consistent, but the key design is to accept a narrow contract, reject invalid input with a stable 400 response, and pass normalized values to business logic.

Validation is separate from authorization and business rules. For example, an email can be syntactically valid but already registered, which is a domain conflict rather than a malformed request. Do not pass arbitrary request objects into persistence code or spread unvalidated bodies into database updates; allow-list writable fields to prevent mass assignment.

# Why It Matters

Boundary validation reduces confusing errors, protects downstream systems, and gives clients actionable feedback. It also prevents unexpected fields from silently changing sensitive state.

# Code Example

```typescript
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
type CreateUserBody = { email?: unknown; displayName?: unknown };
app.post('/users', (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  const { email, displayName } = req.body;
  if (typeof email !== 'string' || !email.includes('@') || typeof displayName !== 'string' || displayName.length > 80) {
    return res.status(400).json({ error: 'email and displayName are invalid' });
  }
  return res.status(201).json({ id: 1, email, displayName });
});
app.listen(3000);
```

# Common Mistakes

- **Assuming a parsed body is valid:** JSON parsing accepts values that do not satisfy the endpoint contract.
- **Using `req.body` directly in an update:** Extra client-supplied properties can overwrite fields such as roles or ownership IDs.

# Follow-up Questions

- **Should validation middleware mutate `req.body`?** (Answer: Prefer storing a normalized validated value separately or replacing it deliberately and consistently.)
- **Which status code fits a duplicate unique value?** (Answer: Usually 409 Conflict, because the request is well-formed but conflicts with current state.)
