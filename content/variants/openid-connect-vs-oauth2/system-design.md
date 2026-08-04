---
id: variant.openid-connect-vs-oauth2.system-design
question: question.openid-connect-vs-oauth2
technology: tech.system-design
---
# Expected Answer (OpenID Connect Core 1.0)

OAuth 2.0 is an authorization framework. It defines how a client obtains an access token to call a resource server with a user's delegated permission; it does not standardize how the client proves who the user is. OpenID Connect (OIDC) is an identity layer on OAuth 2.0 that adds authentication semantics, discovery, a UserInfo endpoint, and the ID Token.

An ID Token is issued to the client, or relying party, and contains claims about the authentication event and end user. The relying party validates its signature and claims such as `iss`, `aud`, `exp`, and, when applicable, `nonce`. An access token is for a resource server, so its audience and validation rules are specific to that API. A client must not use an access token as proof of login, and an API should not accept an ID Token as its authorization credential.

Use OIDC when an application needs to sign a user in. Use OAuth authorization scopes and access tokens when a client needs delegated API access. They commonly appear in the same authorization-code-with-PKCE flow, but solve distinct problems.

# Why It Matters

Confusing identity tokens with API credentials leads to audience confusion and accepting tokens at the wrong recipient. Clear token purpose makes authorization boundaries verifiable and reduces accidental over-privilege.

# Example Code

```typescript
interface IdTokenClaims {
  iss: string;
  aud: string | string[];
  sub: string;
  exp: number;
  nonce?: string;
}

function hasExpectedAudience(claims: IdTokenClaims, clientId: string): boolean {
  return Array.isArray(claims.aud) ? claims.aud.includes(clientId) : claims.aud === clientId;
}
```

# Common Mistakes

- **Calling OAuth a complete authentication protocol:** OAuth can be used with authentication, but it does not itself define standardized login identity assertions.
- **Sending an ID Token to an API as a bearer credential:** The token's audience is the client, not necessarily the resource server.
- **Trusting decoded claims without verification:** Anyone can construct a JWT-shaped string; signature and claim validation establish trust.

# Follow-up Questions

- **Why does an OIDC request use `nonce`?** (Answer: It binds the ID Token to the browser request and mitigates token replay in relevant flows.)
- **What does `sub` represent?** (Answer: The issuer-local, stable identifier for the authenticated end user.)

# References

- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
