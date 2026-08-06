---
id: variant.graphql-api-design.system-design
question: question.graphql-api-design
technology: tech.system-design
---
# Expected Answer

GraphQL provides a typed graph-shaped contract in which clients request precisely the fields they need. Design the schema around business concepts rather than mirroring database tables: use query fields for reads, mutations for state changes, input types for commands, and connection types for paginated lists. Nullability is part of the contract: mark a field non-null only when the server can uphold that guarantee, because a resolver error propagates through non-null parents.

The key server-side concern is execution cost. A nested query can cause one database call per parent item—the N+1 problem. Request-scoped batch loaders collect keys and issue one query, while caching preserves result sharing within the request. Enforce authorization at the resolver or domain-service layer for every protected field and mutation. Put limits on query depth, field complexity, page size, and execution time; persisted queries can further reduce arbitrary query exposure. Evolve a schema by adding fields and deprecating old ones, then observe usage before removing them.

# Why It Matters

GraphQL can simplify client development, but unconstrained nested queries can overload databases and downstream services. A carefully designed schema makes data needs explicit without making the API an unbounded query engine.

# Example Code

```typescript
import DataLoader from "dataloader";

const users = new DataLoader(async (ids: readonly string[]) => {
  const rows = await db.user.findMany({ where: { id: { in: [...ids] } } });
  const byId = new Map(rows.map((row) => [row.id, row]));
  return ids.map((id) => byId.get(id) ?? null);
});

export const resolvers = {
  Order: { customer: (order: { customerId: string }) => users.load(order.customerId) },
};
```

# Common Mistakes

- **Writing a resolver that queries the database for every nested item:** A list of 100 orders can become 101 database queries and collapse under normal traffic.
- **Authorizing only top-level queries:** A protected nested field can leak data when clients select it through another allowed object.
- **Exposing unlimited connections:** Large page sizes and deeply nested selections let one request consume disproportionate resources.

# Follow-up Questions

- **Why is a DataLoader request-scoped?** (Answer: It batches and caches only for one operation, avoiding stale or cross-user cached authorization results.)
- **How do schema deprecations work?** (Answer: Mark the old field deprecated, offer a replacement, observe client usage, then remove it in a planned breaking change.)

# Related Questions

- [REST API Design](/questions/rest-api-design)
- [Caching Strategies](/questions/caching-strategies)

# References

- [GraphQL Specification](https://spec.graphql.org/)
- [GraphQL: Serving over HTTP](https://graphql.github.io/graphql-over-http/)
