---
id: variant.graphql-schema-evolution.system-design
question: question.graphql-schema-evolution
technology: tech.system-design
---
# Expected Answer

GraphQL schemas are usually evolved through additive changes. Add a replacement field, document it, mark the old field with `@deprecated`, and use operation telemetry to determine whether active clients have migrated before removing it. Never assume GraphQL's client-selected fields make every addition harmless: adding an enum value can break generated exhaustive switches, and changing nullability affects both generated types and error propagation. Avoid changing an existing field's type or making an optional input required; introduce a new field or input member instead.

Deprecation needs governance. A deprecation reason should say what to use instead, schema checks should reject breaking changes unless approved, and persisted-query or field-usage metrics should identify clients still selecting the old field. For a type migration, expose `newPrice` beside the legacy `price`, populate both while clients migrate, then remove the legacy field only after the announced window. Be especially careful with non-null fields: an error resolving one can null an enclosing response path, so a non-null promise must be operationally reliable.

# Why It Matters

Schema changes deploy faster than many clients update. A disciplined migration path lets teams improve contracts without unexpected application crashes or partial response failures.

# Example Code

```graphql
type Product {
  price: Int @deprecated(reason: "Use priceMoney")
  priceMoney: Money!
}

type Money { amount: Int!, currency: String! }
```

# Common Mistakes

- **Removing a deprecated field immediately:** Deprecation is documentation, not proof that all independently deployed clients have migrated.
- **Adding an enum member without warning clients:** Exhaustive client switches can throw or render an invalid state on a new value.

# Follow-up Questions

- **Why can a nullable-to-non-null change break clients?** (Answer: Existing data or resolver failures may produce null, and the client type contract changes.)
- **How do persisted queries help migration?** (Answer: They provide a finite, observable set of server-known operation documents.)

# Related Questions

- [GraphQL API Design](/questions/graphql-api-design)
- [REST API Versioning](/questions/rest-api-versioning)

# References

- [GraphQL Specification: Deprecation](https://spec.graphql.org/October2021/#sec--deprecated)
- [GraphQL Specification: Nullability](https://spec.graphql.org/October2021/#sec-Non-Null)
