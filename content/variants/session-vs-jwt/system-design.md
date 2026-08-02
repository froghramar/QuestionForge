---
id: variant.session-vs-jwt.system-design
question: question.session-vs-jwt
technology: tech.system-design
---
# Expected Answer

The choice between **Sessions** and **JWTs** depends on your application's scale and security requirements.

- **Sessions** are stateful. The server keeps track of who is logged in. This makes it very easy to revoke a session (e.g., if a user's account is compromised), but it makes scaling harder because you need a centralized session store like Redis so all your server nodes know about the session.
- **JWTs (JSON Web Tokens)** are stateless. All the user information is encoded into the token itself. The server just verifies the signature. This is incredibly easy to scale horizontally, but it's very hard to "log someone out" before the token naturally expires, as the server doesn't maintain a list of active tokens.

# Why It Matters

Using JWTs incorrectly is a common source of security vulnerabilities. For example, storing a JWT in `localStorage` makes it vulnerable to **XSS** (Cross-Site Scripting). Conversely, using Sessions makes your application more susceptible to **CSRF** (Cross-Site Request Forgery) unless you implement specific protections.

# Example Architecture

### Session Flow
1. User logs in.
2. Server creates session in Redis and sends a `Set-Cookie: session_id=abc` header.
3. Browser stores cookie and sends it automatically on every request.
4. Server reads `abc` from cookie, looks up user in Redis.

### JWT Flow
1. User logs in.
2. Server creates a signed JWT and sends it in the response body.
3. Client stores JWT in `localStorage` or a cookie.
4. Client sends `Authorization: Bearer <jwt>` header on every request.
5. Server validates the signature of the JWT to identify the user.

# Common Mistakes

- **Storing sensitive data in JWT payload:** Remembering that the payload is only Base64 encoded, not encrypted. Anyone who sees the token can read the data.
- **Not using `HttpOnly` cookies for sessions:** Leaving the session cookie accessible to JavaScript, which exposes it to XSS.
- **Using JWTs for everything:** Using a JWT for a simple monolithic web app where a session would be simpler, more secure, and provide better control over user logout.

# Follow-up Questions

- **How do you revoke a JWT?** (Answer: You can't revoke it directly. You must either wait for it to expire, or maintain a "blacklist" of revoked tokens in a database, which effectively makes the system stateful again).
- **What is the "stateless" benefit of JWT?** (Answer: The server doesn't need to perform a database or cache lookup to identify the user; it only needs to perform a CPU-bound cryptographic signature check).
- **What is the `exp` claim in a JWT?** (Answer: The "Expiration Time" claim, which specifies the exact time after which the token must not be accepted).

# References

- [Auth0: JWT vs Sessions](https://auth0.com/blog/jwt-vs-sessions-which-is-right-for-your-app-or-api/)
- [OWASP: JSON Web Token Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
