---
id: variant.oauth2-client-credentials-scopes.system-design
question: question.oauth2-client-credentials-scopes
technology: tech.system-design
---
# Expected Answer (OAuth 2.0 / RFC 9700)

The client credentials grant is for machine-to-machine access. The client authenticates to the authorization server as itself and receives an access token representing the client or workload, not an end user. Use it when a backend service, scheduled job, or workload needs to call an API under its own narrowly defined permissions. Do not use it to represent a user's delegated authorization; that requires a user-facing flow such as authorization code with PKCE.

Scopes describe allowed operations, such as `orders.read`, while the audience identifies the resource server expected to accept the token. A resource server should validate its own audience and then enforce the scopes or permissions required for the requested operation. Tokens should be short lived and specific to one resource server where possible. Protect client authentication with workload identity, a managed identity, or asymmetric authentication in production; a static shared client secret is a credential that needs rotation and secure storage.

# Why It Matters

An over-broad machine token can let a compromised service access unrelated APIs or perform destructive actions. Separating audience from scope limits blast radius and makes authorization decisions explicit.

# Example Code

```typescript
interface AccessTokenClaims {
  aud: string | string[];
  scope?: string;
  client_id: string;
}

export function canReadOrders(claims: AccessTokenClaims): boolean {
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  return audience.includes('https://orders-api.example')
    && claims.scope?.split(' ').includes('orders.read') === true;
}
```

# Common Mistakes

- **Using client credentials for a user's request:** The resulting token cannot express which user granted access or which user-specific policy applies.
- **Checking scopes but not audience:** A token for another API may contain a similarly named scope and must not be accepted here.
- **Giving every workload an admin scope:** A breach of one service then becomes a breach of the entire API estate.

# Follow-up Questions

- **What identity does a client-credentials token represent?** (Answer: The client or workload, rather than a human resource owner.)
- **Why use short-lived machine tokens?** (Answer: They reduce the time a stolen token can be replayed and encourage automated credential rotation.)

# References

- [RFC 9700: OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/rfc9700/)
