---
id: variant.refresh-token.dotnet
question: question.refresh-token
technology: tech.dotnet
---
# Expected Answer (.NET 10 / C# 14)

A **Refresh Token** is a long-lived credential used to obtain new **Access Tokens** (JWTs) without requiring the user to re-enter their password.

- **Why use it?**: Access tokens are short-lived (e.g., 15 mins) for security. If stolen, they expire quickly. Refresh tokens allow the app to stay logged in while keeping the attack window small.
- **Workflow**: 
    1. Client sends Refresh Token to `/refresh` endpoint.
    2. Server validates it against a database.
    3. Server issues a new Access Token (and optionally a new Refresh Token).

# Why It Matters

Without refresh tokens, users would have to log in constantly, or you'd have to make Access Tokens long-lived, which is a major security risk (since JWTs cannot be easily revoked before they expire).

# Code Example

```csharp
public class User
{
    public string RefreshToken { get; set; }
    public DateTime RefreshTokenExpiry { get; set; }
}

// Logic in AuthController
if (user.RefreshToken == providedToken && user.RefreshTokenExpiry > DateTime.UtcNow)
{
    var newAccessToken = GenerateJwt(user);
    var newRefreshToken = GenerateSecureRandomString();
    
    user.RefreshToken = newRefreshToken; // Rotation
    _db.SaveChanges();
    
    return Ok(new { AccessToken = newAccessToken, RefreshToken = newRefreshToken });
}
```

# Common Mistakes

- **Storing Refresh Tokens in LocalStorage**: It's safer to store them in an `HttpOnly`, `SameSite=Strict` cookie to prevent XSS attacks.
- **Not Revoking Tokens**: If a user logs out or changes their password, all their active refresh tokens should be deleted from the database.

# Follow-up Questions

- **What is Refresh Token Rotation?** (Answer: Issuing a new refresh token every time the old one is used, which helps detect if a token was stolen).
- **Where are Access Tokens usually stored?** (Answer: In memory or as short-lived cookies).
