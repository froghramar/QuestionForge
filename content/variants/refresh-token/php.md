---
id: variant.refresh-token.php
question: question.refresh-token
technology: tech.php
---
# Expected Answer (PHP 8.5 / Laravel)

In PHP web applications, refresh tokens are used to extend sessions for JWT or API-based authentication (e.g., using **Laravel Passport** or **Sanctum**).

- **Laravel Passport**: Provides full OAuth2 support, including refresh tokens out of the box.
- **Laravel Sanctum**: Uses simple database-backed tokens. While it doesn't use "Refresh Tokens" in the strict JWT sense, it allows issuing long-lived tokens that can be revoked.

# Why It Matters

Refresh tokens are vital for SPAs (Single Page Applications) and mobile apps. They allow the app to securely store a long-lived credential (ideally in an `HttpOnly` cookie) to keep the user logged in without exposing their password repeatedly over the network.

# Code Example

```javascript
// Typical client-side flow with a PHP backend
// When Access Token expires (401 error)...
axios.post('/oauth/token', {
    grant_type: 'refresh_token',
    refresh_token: the_stored_refresh_token,
    client_id: '...',
    client_secret: '...'
}).then(response => {
    // Save new tokens
});
```

# Common Mistakes

-   **Storing refresh tokens in JavaScript state**: They should be in secure cookies to prevent theft via XSS.
-   **Not using HTTPS**: Refresh tokens are powerful; if intercepted on an unencrypted connection, the attacker has full access to the user's account.

# Follow-up Questions

-   **Sanctum vs Passport?** (Answer: Sanctum is for simple token/session auth; Passport is for full OAuth2 compliance).
-   **What is 'Token Hashing'?** (Answer: Storing a hash of the token in the database rather than the plain-text token, so that if the DB is leaked, the tokens are useless).
---
