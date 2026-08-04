---
id: variant.oidc-discovery-jwks.system-design
question: question.oidc-discovery-jwks
technology: tech.system-design
---
# Expected Answer (OpenID Connect Discovery 1.0)

OIDC discovery begins with an issuer that the application has configured and trusts. The relying party retrieves that issuer's OpenID Provider metadata from its well-known configuration endpoint, verifies that the returned `issuer` is exactly the expected issuer, and uses metadata such as `authorization_endpoint`, `token_endpoint`, and `jwks_uri`. It must not start this process from a user-controlled issuer URL, because that would let an attacker choose endpoints and signing keys.

The JWKS endpoint contains public keys used to verify tokens. Each key normally has a `kid`; the relying party uses it to select a candidate trusted key and caches the set according to HTTP cache controls. During planned rotation, the issuer publishes the new key before signing with it. If a token has an unknown `kid`, refresh the JWKS once and then reject the token if the key remains unknown—do not accept an arbitrary key embedded in the token or fetch a JWKS from an untrusted URL.

# Why It Matters

Discovery and JWKS simplify endpoint and key rotation, but only when the issuer remains the explicit trust anchor. Incorrect key retrieval turns signature verification into verification against attacker-provided keys.

# Example Code

```typescript
interface ProviderMetadata {
  issuer: string;
  jwks_uri: string;
  authorization_endpoint: string;
}

export async function loadProvider(issuer: string): Promise<ProviderMetadata> {
  const response = await fetch(`${issuer}/.well-known/openid-configuration`);
  const metadata = await response.json() as ProviderMetadata;
  if (metadata.issuer !== issuer || !metadata.jwks_uri.startsWith(`${issuer}/`)) {
    throw new Error('Untrusted OIDC metadata');
  }
  return metadata;
}
```

# Common Mistakes

- **Trusting a token's `jku` header by default:** This lets a token direct the verifier to attacker-controlled keys.
- **Caching JWKS forever:** Legitimate key rotation then causes outages or encourages unsafe bypasses.
- **Refreshing keys for every request:** This creates avoidable latency and a dependency-amplification problem; follow cache controls and refresh on an unknown key ID.

# Follow-up Questions

- **What is the purpose of `kid`?** (Answer: It identifies a key in a set so verifiers can select the proper candidate during rotation.)
- **Why validate the metadata issuer?** (Answer: It confirms that the discovered configuration belongs to the configured trust anchor.)

# References

- [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html)
