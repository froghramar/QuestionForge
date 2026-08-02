---
id: concept.auth-types
title: Session vs. Token Authentication (JWT)
slug: auth-types
topic: topic.web-fundamentals
description: Comparing stateful session management with stateless JWT-based authentication.
---
# Authentication Types

There are two primary ways to maintain a user's authenticated state after login: **Sessions** and **Tokens (JWT)**.

## 1. Session-based Authentication (Stateful)
- **Mechanism:** When a user logs in, the server creates a session in its memory or a database and sends a `Session ID` to the client in a cookie.
- **Client Side:** The browser automatically sends the cookie with every subsequent request.
- **Server Side:** The server looks up the Session ID in its store to verify the user.
- **Pros:** Easy to revoke sessions (logout), secure against XSS if `HttpOnly` cookies are used.
- **Cons:** Harder to scale horizontally (requires a shared session store like Redis), vulnerable to CSRF.

## 2. Token-based Authentication (Stateless / JWT)
- **Mechanism:** The server generates a **JSON Web Token (JWT)** containing user data (claims) and signs it with a secret key. The token is sent to the client.
- **Client Side:** The client stores the token (usually in `localStorage` or a cookie) and sends it in the `Authorization` header (`Bearer <token>`).
- **Server Side:** The server verifies the signature. It doesn't need to look up anything in a database.
- **Pros:** Highly scalable (stateless), works well for mobile apps and cross-domain APIs.
- **Cons:** Impossible to revoke before expiration (without a blacklist), security risks if stored in `localStorage` (XSS).

## Summary Table

| Feature | Session | JWT |
| :--- | :--- | :--- |
| **State** | Stateful (Server remembers) | Stateless (Token contains info) |
| **Scalability** | Requires shared store | Easy to scale |
| **Revocation** | Immediate | Difficult (until expiry) |
| **Size** | Small (just an ID) | Large (contains payload) |
