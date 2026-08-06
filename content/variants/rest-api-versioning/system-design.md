---
id: variant.rest-api-versioning.system-design
question: question.rest-api-versioning
technology: tech.system-design
---
# Expected Answer

API versioning is a last resort for breaking contract changes, not a substitute for careful evolution. Prefer additive changes: add an optional response property, add a new endpoint, or introduce a new optional request field with a safe default. Do not rename, remove, or silently change the meaning or type of an existing field. Even an added enum value can break a client that assumes it has handled every value, so document extensibility expectations.

When a breaking change is necessary, choose one consistent versioning mechanism. A path such as `/v2/orders` is conspicuous and easy to route; a media-type or header version keeps resource paths stable but is less visible in simple tooling. The mechanism matters less than the lifecycle: publish migration documentation, support versions concurrently for a defined period, add deprecation and sunset signals, measure which clients still use the old version, and contact owners before removal. Contract tests and API gateway metrics make this operational rather than hopeful.

# Why It Matters

Clients release on their own schedules. A breaking change without a migration window can disable mobile apps, partners, and background jobs the server team does not control.

# Example Code

```typescript
app.get("/v1/orders/:id", getLegacyOrder);
app.get("/v2/orders/:id", async (req, res) => {
  const order = await orders.find(req.params.id);
  res.json({ id: order.id, status: order.status, total: { amount: order.total, currency: "USD" } });
});
```

# Common Mistakes

- **Changing a field in place:** Changing `total` from a number to an object breaks deserializers under the same contract version.
- **Keeping old versions forever:** Permanent parallel implementations increase security and maintenance risk; establish an observed retirement date.

# Follow-up Questions

- **Are URL versions always required?** (Answer: No; headers or media types can work, but the team must apply one contract policy consistently.)
- **How do you know removal is safe?** (Answer: Combine API telemetry, client-owner communication, and the published sunset policy.)

# Related Questions

- [REST API Design](/questions/rest-api-design)
- [PUT vs PATCH](/questions/put-vs-patch)

# References

- [RFC 9745: Deprecation HTTP Response Header](https://www.rfc-editor.org/rfc/rfc9745)
- [RFC 8594: The Sunset HTTP Response Header Field](https://www.rfc-editor.org/rfc/rfc8594)
