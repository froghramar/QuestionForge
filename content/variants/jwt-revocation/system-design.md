---
id: variant.jwt-revocation.system-design
question: question.jwt-revocation
technology: tech.system-design
---
# Expected Answer (JWT BCP / RFC 8725)

A self-contained JWT remains valid until its expiration if the verifier only checks its signature and claims. Therefore, immediate revocation requires some server-side state or a change in trust material. The usual baseline is short-lived access tokens, so a stolen token has a limited replay window, combined with refresh-token rotation and revocation. On each refresh, issue a new refresh token, invalidate the old one, and detect reuse. Reuse signals theft or a race and should revoke the refresh-token family or affected session.

For stronger real-time control, an API can check a deny list keyed by token ID, a session version stored with the user, or an authorization server's token-introspection endpoint. Each approach adds latency, availability dependency, or state, so select it based on the required logout and incident-response window. Retiring a signing key invalidates all tokens signed by it, which is appropriate after a key compromise but far too broad for ordinary user logout.

# Why It Matters

Calling JWTs "stateless" without specifying the revocation window can leave stolen credentials usable after logout, password reset, or a security incident. A clear token lifecycle makes that risk measurable and manageable.

# Example Code

```typescript
interface AccessTokenClaims {
  sub: string;
  sid: string;
  session_version: number;
}

export async function isActiveSession(claims: AccessTokenClaims): Promise<boolean> {
  const session = await findSession(claims.sid);
  return session?.userId === claims.sub
    && session.revokedAt === null
    && session.version === claims.session_version;
}
```

# Common Mistakes

- **Expecting logout to invalidate a stateless access token automatically:** Without a state check, it remains usable until `exp`.
- **Using a long-lived access token to avoid refresh complexity:** This creates a long replay window for a leaked bearer token.
- **Rotating a refresh token without detecting reuse:** An attacker with an old token can continue unnoticed unless reuse revokes the relevant session family.

# Follow-up Questions

- **What can immediately invalidate every token signed with one key?** (Answer: Retiring that signing key, though it is disruptive and should be reserved for key compromise.)
- **Why rotate refresh tokens?** (Answer: Rotation makes reuse of an older refresh token detectable and reduces the value of theft.)

# References

- [RFC 8725: JSON Web Token Best Current Practices](https://datatracker.ietf.org/doc/html/rfc8725)
