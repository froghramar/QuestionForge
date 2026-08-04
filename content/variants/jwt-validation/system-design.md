---
id: variant.jwt-validation.system-design
question: question.jwt-validation
technology: tech.system-design
---
# Expected Answer (JWT BCP / RFC 8725)

JWT validation starts with treating an incoming token as untrusted. Base64url decoding reveals claims but provides no proof that they were issued by a trusted party. A verifier must use trusted key material, restrict the accepted algorithms rather than trusting the token header, and verify the JWS signature. It must then enforce application-specific claims: at minimum expiration, issuer, and audience, plus token type, scopes, and any subject or authorization requirements relevant to the endpoint.

Keys should be obtained from a trusted configured issuer, commonly through a JWKS endpoint, and rotated with `kid` handling. Do not let an attacker choose an arbitrary JWKS URL or accept an algorithm/key-type mismatch. A signed JWT is not encrypted, so never put secrets or sensitive personal data in its payload unless it is intentionally encrypted and recipients are designed to decrypt it. Keep access tokens short lived; early revocation requires state, such as deny-listing, token introspection, or a session/token version check.

# Why It Matters

Skipping signature, issuer, audience, or algorithm validation can turn a token issued for another service—or a forged token—into unauthorized access. These are high-impact boundary checks that must be centralized and tested.

# Example Code

```typescript
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';

const issuer = 'https://issuer.example';
const audience = 'https://api.example';
const keys = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));

export async function verifyAccessToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, keys, {
    issuer,
    audience,
    algorithms: ['ES256'],
  });
  if (payload.typ !== 'at+jwt') throw new Error('Unexpected token type');
  return payload;
}
```

# Common Mistakes

- **Only decoding the token:** Decoding is formatting, not cryptographic verification, so forged claims are accepted.
- **Accepting whatever algorithm the header requests:** Algorithm confusion attacks become possible; pin the allowed algorithms and key type.
- **Checking expiration but not audience:** A valid token issued to a different API can be replayed at this API.

# Follow-up Questions

- **How does JWT key rotation work?** (Answer: Publishers expose multiple public keys with IDs; verifiers select a trusted key by `kid` and refresh the trusted key set.)
- **Can JWTs be revoked immediately?** (Answer: Not purely statelessly; introduce server-side state or use short expiration plus an appropriate revocation mechanism.)

# References

- [RFC 8725: JSON Web Token Best Current Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [RFC 7519: JSON Web Token](https://www.rfc-editor.org/rfc/rfc7519)
