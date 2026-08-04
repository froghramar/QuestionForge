---
id: variant.oauth2-token-exchange.system-design
question: question.oauth2-token-exchange
technology: tech.system-design
---
# Expected Answer (OAuth 2.0 Token Exchange / RFC 8693)

OAuth token exchange lets a client present a subject token to an authorization server and receive a new token for a different target resource, audience, scope, or token type. It is useful when service A receives a user-delegated token and must call service B. Rather than forwarding a token that may be valid for many resources, A requests a short-lived, B-specific token with only the permissions B needs. The issued token can preserve the user as the subject while identifying A as the actor, making delegation visible to policy and audit systems.

The authorization server must validate the subject token, ensure the requesting client is allowed to exchange it, and enforce policy for the requested audience and scopes. The downstream resource validates the new token for itself; it should not accept the upstream token merely because it is valid somewhere in the system. Token exchange is not a reason to create unrestricted service impersonation: bind each hop to a concrete resource and minimize privilege.

# Why It Matters

Forwarding broad tokens across a microservice graph expands the audience that can replay a stolen token. Exchanged tokens reduce that blast radius and create clearer service-to-service audit trails.

# Example Code

```typescript
interface TokenExchangeRequest {
  subject_token: string;
  subject_token_type: 'urn:ietf:params:oauth:token-type:access_token';
  requested_token_type: 'urn:ietf:params:oauth:token-type:access_token';
  audience: 'https://inventory-api.example';
  scope: 'inventory.read';
}

export async function exchangeForInventory(request: TokenExchangeRequest): Promise<Response> {
  return fetch('https://issuer.example/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange', ...request }),
  });
}
```

# Common Mistakes

- **Forwarding the original user token to every service:** It may have a broad audience and scopes, allowing a compromised downstream service to reuse it elsewhere.
- **Letting the caller choose arbitrary audiences:** The authorization server must authorize the requested target, not treat the audience parameter as trusted input.
- **Confusing an actor with the user subject:** Auditing and policy need to distinguish the service that acted from the user on whose behalf it acted.

# Follow-up Questions

- **What is token exchange primarily for?** (Answer: Obtaining a constrained token for a downstream resource from an existing trusted token.)
- **How does it support least privilege?** (Answer: The new token can have a narrow audience, scope, and lifetime for one hop.)

# References

- [RFC 8693: OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693)
