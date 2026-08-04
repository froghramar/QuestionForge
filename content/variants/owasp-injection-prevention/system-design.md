---
id: variant.owasp-injection-prevention.system-design
question: question.owasp-injection-prevention
technology: tech.system-design
---
# Expected Answer (OWASP Top 10:2025)

Injection happens when untrusted input is interpreted as part of a command or query language. The primary defense is a parameterized API: the program sends the statement or command structure separately from values, so the interpreter cannot treat an input value as syntax. This applies to SQL and analogous safe APIs in other domains. Input validation remains useful for domain rules and reducing bad requests, but it is not the boundary that makes a query safe.

Parameters cannot generally represent language identifiers such as a SQL column name or sort direction. For dynamic structural choices, map an external value to a fixed internal allowlist; never concatenate the original input. Use database accounts with only the permissions the application needs, avoid returning detailed parser errors to users, and test malicious inputs in every interpreter boundary—SQL, shell, templates, LDAP, and other query languages all have distinct safe APIs.

# Why It Matters

Injection can expose, change, or destroy data and can sometimes execute commands on application infrastructure. Parameterization and least privilege turn a broad class of input-driven attacks into ordinary validation failures.

# Example Code

```typescript
const sortColumns = { created: 'created_at', title: 'title' } as const;
type SortKey = keyof typeof sortColumns;

export async function listProjects(sort: SortKey, limit: number): Promise<unknown[]> {
  const column = sortColumns[sort];
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  return database.query(
    `SELECT id, title FROM projects ORDER BY ${column} DESC LIMIT $1`,
    [safeLimit],
  );
}
```

# Common Mistakes

- **Escaping values by hand:** Escaping rules vary by language and context; parameterized APIs are more reliable.
- **Parameterizing values but concatenating a user-provided column name:** Identifiers need an allowlist because placeholders normally cannot represent SQL syntax.
- **Running the application with a database owner account:** A successful injection then has far more destructive capability than the feature requires.

# Follow-up Questions

- **Why cannot a placeholder normally replace a SQL column name?** (Answer: Placeholders bind literal values, whereas an identifier is part of the query's syntax.)
- **Does input validation replace parameterization?** (Answer: No. Validation enforces business rules; parameterization prevents input from becoming query syntax.)

# References

- [OWASP Top 10:2025 — Injection](https://owasp.org/Top10/2025/A05_2025-Injection/)
