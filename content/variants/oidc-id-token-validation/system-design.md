---
id: variant.oidc-id-token-validation.system-design
question: question.oidc-id-token-validation
technology: tech.system-design
---
# Expected Answer (OpenID Connect Core 1.0)

An ID Token is trustworthy only after the relying party validates it against a configured OIDC issuer. Verify the signature using the issuer's trusted key set and allow only expected algorithms. Validate `iss` exactly, ensure `aud` contains this client ID, and handle `azp` when the specification requires it for multiple audiences. Enforce time claims such as `exp`, with limited clock skew. Verify `nonce` against the value stored when the browser login request started, then consume that stored value so a response cannot be replayed.

Use provider discovery only from a preconfigured, trusted issuer; do not let a user-controlled issuer or `jwks_uri` decide where signing keys come from. In authorization-code flow, validate the callback `state` before processing the response. Use an established OIDC library for protocol details, but configure its issuer, client ID, redirect URI, algorithms, and session behavior deliberately.

# Why It Matters

Signature verification alone can accept an ID Token issued to another client or from a confused trust boundary. Claim and request binding validation stops token substitution and replay attacks.

# Example Code

```typescript
interface IdTokenPayload {
  iss: string;
  aud: string | string[];
  exp: number;
  nonce?: string;
}

export function validateIdTokenClaims(payload: IdTokenPayload, nonce: string): boolean {
  const audience = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  return payload.iss === 'https://issuer.example'
    && audience.includes('web-client')
    && payload.exp > Math.floor(Date.now() / 1000)
    && payload.nonce === nonce;
}
```

# Common Mistakes

- **Validating the signature but not `aud`:** A token intended for another relying party can be accepted by this application.
- **Reusing a nonce across login attempts:** A captured response may be replayed; generate and consume a nonce per request.
- **Trusting discovery URLs supplied by an untrusted user:** This can redirect key retrieval to an attacker-controlled issuer.

# Follow-up Questions

- **What is the role of `state` in OIDC authorization code flow?** (Answer: It binds the callback to the browser session and protects against request forgery.)
- **Why might `azp` be required?** (Answer: With multiple audiences, it identifies the authorized party that received the ID Token.)

# References

- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
