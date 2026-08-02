---
id: variant.refresh-token.java
question: question.refresh-token
technology: tech.java
---
# Expected Answer (Java 26 / Spring Security)

A **Refresh Token** allows a client to obtain new **Access Tokens** without re-authenticating the user.

- **Storage**: Unlike Access Tokens (which are usually stateless JWTs), Refresh Tokens are often stored in a database (e.g., Redis or RDBMS) to allow for **Revocation**.
- **Implementation**: In Spring Security, this is often handled by a custom `TokenProvider` or by using Spring Authorization Server.

# Why It Matters

It balances security and UX. Access tokens can be extremely short-lived (5-10 mins). If a user's browser is compromised and the JWT is stolen, the attacker only has a small window. The Refresh Token is kept in a more secure place (like an `HttpOnly` cookie) and can be invalidated by the server if suspicious activity is detected.

# Code Example

```java
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
}

// Logic in a RefreshService
public TokenResponse refresh(String refreshToken) {
    RefreshToken token = repository.findByToken(refreshToken)
        .filter(t -> t.getExpiryDate().isAfter(Instant.now()))
        .orElseThrow(() -> new TokenException("Invalid Refresh Token"));

    String newAccess = jwtUtils.generateToken(token.getUser());
    return new TokenResponse(newAccess, refreshToken);
}
```

# Common Mistakes

-   **Infinite Refresh**: Allowing a refresh token to last forever. They should eventually expire, requiring a full login.
-   **Exposing the token**: Sending it in the JSON body of every response instead of using secure cookies.

# Follow-up Questions

-   **What is 'Token Revocation'?** (Answer: The ability to manually invalidate a token before its natural expiry, usually by deleting it from the server-side store).
-   **OAuth2 Scopes**: How do they relate? (Answer: Refresh tokens usually have a specific scope (`offline_access`) to allow background token renewal).
---
